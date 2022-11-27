import { CategoryChoiceDialogComponent } from './../category-choice-dialog/category-choice-dialog.component';
import { CategoryService } from './../../services/category/category.service';
import { DictionaryService } from './../../services/dictionary/dictionary.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { category, dictionary } from 'src/app/interfaces/dictionary';
import { UserService } from 'src/app/services/user/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})


export class DictionaryComponent implements OnInit {

  form = this.formBuilder.group({
    word: ['', Validators.required],
    translation: ['', Validators.required],
    definition:[''],
    categories: [''],
    newCategories: this.formBuilder.array([])
  });

  // createCategoryGroup(categories: category): FormGroup {
  //   return this.formBuilder.group({
  //     ...categories
  //   });
  // }

  constructor(
    private userService: UserService,
    private dictionaryService: DictionaryService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private categoryService: CategoryService) { }

  userId!: string;
  words: dictionary[] = [];
  categories: category[] = [];
  categoriesUpdate: category[] = [];
  dataSource!: MatTableDataSource<dictionary>;
  displayedColumns?: string[] = ['Nr', 'Word', 'Translation', 'Definition','Categories', 'Delete'];
  updateMode = false;
  updateId?: number;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.userService.getUser().subscribe(res =>{
      this.userId = res.Id;
      this.dictionaryService.getAllWordsPhrases(this.userId, []).subscribe(data =>{
          this.words = data;
          this.dataSource = new MatTableDataSource<dictionary>(this.words);
          this.dataSource.paginator = this.paginator;
          this.categoryService.getAllCategories(this.userId).subscribe(res =>{
            this.categories = res;
          })
      })
    });
  }

  get newCategoriesAsFormArray(): any {
    return this.form.get('newCategories') as FormArray;
  }

  newCategory(): any {
    return this.formBuilder.group({
      newCategory: this.formBuilder.control(''),
    });
  }

  addControl(): void {
    this.newCategoriesAsFormArray.push(this.newCategory());
  }

  remove(i: number): void {
    this.newCategoriesAsFormArray.removeAt(i);
  }

  onSubmit(formDirective: FormGroupDirective){
    var newCategories: category[] = [];
    this.form.value.newCategories!.forEach((element: any) => {
      newCategories.push({
        CategoryName: element.newCategory
      })
    });

    const categories = this.form.value.categories as any;
    const categoryIds = categories.map((x: any) => x.CategoryId);

    const data: dictionary = {
      wordPhraseContent: this.form.value.word!,
      translation: this.form.value.translation!,
      definition: this.form.value.definition!,
      userId: this.userId,
      categories: categoryIds,
      newCategories: newCategories
    }
    this.dictionaryService.addWordPhrase(data).subscribe(() =>{
      this.dictionaryService.getAllWordsPhrases(this.userId, []).subscribe(data =>{
        this.words = data;
        this.dataSource = new MatTableDataSource<dictionary>(this.words);
        this.dataSource.paginator = this.paginator;
        this.categoryService.getAllCategories(this.userId).subscribe(res =>{
          this.categories = res;
        })
      })
    });
    formDirective.resetForm();
    this.form.reset();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(wordId: number){
    this.dictionaryService.deleteWordPhrase(wordId).subscribe(() =>{
      this.dictionaryService.getAllWordsPhrases(this.userId, []).subscribe(data =>{
        this.words = data;
        this.dataSource = new MatTableDataSource<dictionary>(this.words);
        this.dataSource.paginator = this.paginator;
    })
    });
  }

  onEdit(wordId: number){
    var word = this.words.find(x => x.wordPhraseId === wordId);
    this.updateMode = true;
    this.updateId = word!.wordPhraseId;
    this.form.controls['definition'].setValue(word!.definition? word!.definition: "");
    this.form.controls['translation'].setValue(word!.translation? word!.translation: "");
    this.form.controls['word'].setValue(word!.wordPhraseContent? word!.wordPhraseContent: "");
    word!.categoriesList!.forEach(element => {
      this.categoriesUpdate.push(this.categories.find(x => x.CategoryId === element.CategoryId)!);
    });
    this.form.controls['categories'].setValue(this.categoriesUpdate as any);
  }

  onUpdate(formDirective: FormGroupDirective){
    var newCategories: category[] = [];
    this.form.value.newCategories!.forEach((element: any) => {
      newCategories.push({
        CategoryName: element.newCategory
      })
    });

    const categories = this.form.value.categories as any;
    const categoryIds = categories.map((x: any) => x.CategoryId);
    const data: dictionary = {
      wordPhraseId: this.updateId,
      wordPhraseContent: this.form.value.word!,
      translation: this.form.value.translation!,
      definition: this.form.value.definition!,
      userId: this.userId,
      categories: categoryIds,
      newCategories: newCategories
    }

    this.dictionaryService.updateWordPhrase(data, this.updateId!).subscribe(res =>{
      this.dictionaryService.getAllWordsPhrases(this.userId, []).subscribe(data =>{
        this.words = data;
        this.dataSource = new MatTableDataSource<dictionary>(this.words);
        this.dataSource.paginator = this.paginator;
        this.categoryService.getAllCategories(this.userId).subscribe(res =>{
          this.categories = res;
        })
    })
    });

    this.updateMode = false;
    formDirective.resetForm();
    this.form.reset();
  }

  chooseCategory(){
    const dialogRef = this.dialog.open(CategoryChoiceDialogComponent, {
      data: {
        categories: this.categories
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

    });
  }
}
