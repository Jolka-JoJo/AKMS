import { CategoryService } from './../../services/category/category.service';
import { UserService } from './../../services/user/user.service';
import { DictionaryService } from './../../services/dictionary/dictionary.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { dictionary, category } from 'src/app/interfaces/dictionary';
import { MatDialog } from '@angular/material/dialog';
import { CategoryChoiceDialogComponent } from '../category-choice-dialog/category-choice-dialog.component';

@Component({
  selector: 'app-practise-words',
  templateUrl: './practise-words.component.html',
  styleUrls: ['./practise-words.component.scss']
})
export class PractiseWordsComponent implements OnInit {
  practiseForm = this.formBuilder.group({
    answer: ['']
  });
  correctAnswer = false;
  progressAdd!: number;
  progress = 0;
  words: dictionary[] = [];
  wordsNotDynamic: dictionary[] = [];
  nextVisible = false;
  userId!: string;

  dictionaryEnd = false;
  incorrectWorrdsIds: number[] = [];
  categories:category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private catgeoryService: CategoryService,
    public dialog: MatDialog,
    private dictionaryService: DictionaryService) { }

  ngOnInit(): void {

    this.userService.getUser().subscribe(user =>{
      this.userId = user.Id;
      this.catgeoryService.getAllCategories(this.userId).subscribe(data =>{
        this.categories = data;
        this.chooseCategory();
      });
      // this.dictionaryService.getAllWordsPhrases(this.userId).subscribe(res =>{
      //   this.words = res;
      //   this.wordsNotDynamic = res;
      //   this.words.map(word => word.isHidden = true);
      //   if(this.words[0].isHidden) this.words[0].isHidden = false;
      //   this.progressAdd = 100 / this.words.length;
      // });
    });
  }

  next(i: number){

    //this.correctAnswer = false;
    this.nextVisible = false;
    this.correctAnswer = false;

    this.words[i].isHidden = true;
    if(this.words[i+1]){
       this.words[i+1].isHidden = false;
    }
    else{
      this.dictionaryEnd = true
    }
    this.practiseForm.reset()

  }

  submit(index: number){
    if(this.practiseForm.value.answer && this.practiseForm.value.answer!.trim() === this.words[index].wordPhraseContent.trim())
    {
      this.correctAnswer = true;
      this.progress += this.progressAdd;
    }
    else
    {
      var temp = Object.assign({}, this.words[index]);
      temp.isHidden = true;
      this.words.push(temp);
      this.incorrectWorrdsIds.push(temp.wordPhraseId!);
    }

    this.nextVisible = true;
  }

  reset(){
    this.progress = 0;
    this.practiseForm.reset();
    this.words = Object.assign([], this.wordsNotDynamic);
    this.nextVisible = false;
    this.correctAnswer = false;
    this.dictionaryEnd = false;
    this.words[0].isHidden = false;
  }

  chooseCategory(){
    const dialogRef = this.dialog.open(CategoryChoiceDialogComponent, {
      data: {
        categories: this.categories
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      var filter: number[] = [];
      if(result){
        filter = result.map((x: any) => x.CategoryId);

      }
      this.dictionaryService.getAllWordsPhrases(this.userId, filter).subscribe(res =>{
        this.words = res;
        this.wordsNotDynamic = res;
        this.words.map(word => word.isHidden = true);
        if(this.words[0].isHidden) this.words[0].isHidden = false;
        this.progressAdd = 100 / this.words.length;
      });

    });
  }

}
