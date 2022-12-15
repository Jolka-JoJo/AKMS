import { UserService } from 'src/app/services/user/user.service';
import { RuleService } from './../../services/rule/rule.service';
import { Component, OnInit } from '@angular/core';
import { Rule } from 'src/app/interfaces/rule';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rule-view',
  templateUrl: './rule-view.component.html',
  styleUrls: ['./rule-view.component.scss']
})
export class RuleViewComponent implements OnInit {
  form = this.formBuilder.group({
    ruleTitle: ['', Validators.required],
    ruleContent: [''],
    filename: [''],
    file:  [null],
  });

  rule!: Rule;
  ruleId!: number;
  update = false;
  filename?: string;
  selectedFile: any = null;
  tempFilename?: string;
  userRole!: string;
  constructor(
    private ruleService: RuleService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ruleId = params['id'];
     });

    this.userRole =  this.userService.getUserRole();

    this.ruleService.getRule(this.ruleId).subscribe((res: any) =>
      {
        this.rule = res.Result;
        if(this.rule.ruleImage) this.filename = "rule_" + this.ruleId + "." + this.getFileExtension(this.rule.ruleImage);
      }
    );

  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        file: file
      });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  getFileExtension(fileName: string) {
    var splitedFilename = fileName.split(".");
    return splitedFilename[splitedFilename.length - 1];
  }

  removeImage(){
    this.tempFilename = undefined;
  }

  updateOpen(){
    this.update = !this.update;
    this.form.controls['ruleTitle'].setValue(this.rule.ruleTitle);
    this.form.controls['ruleContent'].setValue(this.rule.ruleContent!);
    this.tempFilename = this.rule.ruleImage;

  }

  onDelete(){
    this.ruleService.deleteRule(this.ruleId).subscribe(() =>
      this.router.navigate(['/rule'])
    );
  }

  onUpdate(){
    var formData = new FormData();
    const fileToUpload = this.form.value;
    this.userService.getUser().subscribe(res => {

      formData.append('file',  this.form.get('file')!.value!);
      formData.append('ruleTitle', this.form.value.ruleTitle!);
      formData.append('ruleContent', this.form.value.ruleContent!);
      formData.append('userId', res.Id);

      this.ruleService.updateRule(this.ruleId, formData).subscribe(res2=>
      {
        this.rule = res2;
        this.update = false;
        if(this.rule.ruleImage) this.filename = "rule_" + this.ruleId + "." + this.getFileExtension(this.rule.ruleImage);
      });
    });
  }

  cancelTaskUpadate(){
    this.update = false;
  }
}
