import { RuleService } from './../../services/rule/rule.service';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Rule } from 'src/app/interfaces/rule';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {
  form = this.formBuilder.group({
    ruleTitle: ['', Validators.required],
    ruleContent: [''],
    file:  [null],
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private ruleService: RuleService) { }

  rules: Rule[] = [];
  userId!: string;
  userRole!: string;
  dataSource!: MatTableDataSource<Rule>;
  displayedColumns?: string[] = ['Nr', 'RuleTitle', 'RuleContent', 'Actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.userService.getUser().subscribe(res =>{
      this.userRole = this.userService.getUserRole();
      this.userId = res.Id;
      this.ruleService.getAllRules(this.userId).subscribe(data =>
        {
          this.rules = data
          this.dataSource = new MatTableDataSource<Rule>(this.rules);
          this.dataSource.paginator = this.paginator;
        }
      );
    })
    const fileInput = <HTMLInputElement>document.querySelector('ngx-mat-file-input') as any;
  }

  onSubmit(formDirective: FormGroupDirective){
    var formData = new FormData();
    const fileToUpload = this.form.value;

    formData.append('file',  this.form.get('file')!.value!);
    formData.append('ruleTitle', this.form.value.ruleTitle!);
    formData.append('ruleContent', this.form.value.ruleContent!);
    formData.append('userId', this.userId)

    this.ruleService.addRule(formData).subscribe(res=>
    {
      this.rules = res;
      this.dataSource = new MatTableDataSource<Rule>(this.rules);
      this.dataSource.paginator = this.paginator;
    });

    formDirective.resetForm();
    this.form.reset();
    const fileInput = <HTMLInputElement>document.querySelector('ngx-mat-file-input') as any;
    fileInput.value = null;
  }


  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        file: file
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDelete(id: number){
    this.ruleService.deleteRule(id).subscribe(() =>{
      this.ruleService.getAllRules(this.userId).subscribe(res =>{

        this.rules = res;
        this.dataSource = new MatTableDataSource<Rule>(this.rules);
        this.dataSource.paginator = this.paginator;
      })
    });
  }

  removeSavedRule(rule: Rule){
    rule.userId = this.userId;
      this.ruleService.removeRuleFromSaved(rule).subscribe(() =>
        this.ruleService.getAllRules(this.userId).subscribe(res=>
          {
            this.rules = res;
            this.dataSource = new MatTableDataSource<Rule>(this.rules);
            this.dataSource.paginator = this.paginator;
          })
      );
  }

}
