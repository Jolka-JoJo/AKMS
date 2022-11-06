import { UserService } from './../../services/user/user.service';
import { Answer } from './../../models/task/answer.module';
import { LesssonTask, taskType } from './../../models/task/task.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { TasksService } from 'src/app/services/task/tasks.service';
import { AnswersService } from 'src/app/services/task/answers.service';


@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit{

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private answerService: AnswersService,
    private formBuilder: FormBuilder,
    private userService: UserService) {
  }

  taskId!: number;
  task!: LesssonTask;
  filename?: string;
  answers?: Answer[];
  update = false;
  taskTypes = taskType;
  displayAnswerForm = false;
  editAnswermode = false;
  selectedFile: any = null;
  tempFilename?: string;

  taskUpdatingForm = this.formBuilder.group({
    taskTitle: ['', Validators.required],
    taskContent: [''],
    taskType: [''],
    filename: [''],
    file:  ['null'],
  });

  answerForm = this.formBuilder.group({
    answerContent: ['', Validators.required],
    isCorrect:[false],
    answerId:['']
  });

  async ngOnInit() {
    this.route.params.subscribe(params => {
     this.taskId = params['id'];
    });

    await this.getTask();
    await this.getAnswers();
    if(this.task.taskImage) this.filename = "task_" + this.taskId + "." + this.getFileExtension(this.task.taskImage);
  }

  async getTask(){
    const data = this.tasksService.getTask(this.taskId);
    this.task = await lastValueFrom(data);
  }

  async getAnswers(){
    await this.answerService.getAllAnswers(this.taskId).subscribe(data => {
      this.answers = data;
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.taskUpdatingForm.patchValue({
        file: file
      });
    }
  }

  onUpdate(){
    var formData = new FormData();
    formData.append('file',  this.taskUpdatingForm.get('file')!.value!);
    formData.append('removeFile', (this.tempFilename? false: true).toString())
    formData.append('taskTitle', this.taskUpdatingForm.value.taskTitle!);
    formData.append('taskContent', this.taskUpdatingForm.value.taskContent!);
    formData.append('taskType', this.taskUpdatingForm.value.taskType!);
    this.tasksService.updateTask(this.taskId, formData).subscribe(response => this.getTask());
    this.update = false;
  }

  updateOpen(){
    this.update = true;
    this.taskUpdatingForm.controls['taskTitle'].setValue(this.task.taskTitle);
    this.taskUpdatingForm.controls['taskContent'].setValue(this.task.taskContent!);
    this.taskUpdatingForm.controls['taskType'].setValue(this.task.taskType ? this.task.taskType!.toString() : "");
    //this.taskUpdatingForm.controls['filename'].setValue(this.task.taskImage!);
    this.tempFilename = this.task.taskImage;
  }

  onDelete(id: number){
    this.userService.getUser().subscribe(res => {

      this.tasksService.deleteTask(id, res.Id).subscribe(response =>     this.router.navigate(['/tasks']));

    })
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  getFileExtension(fileName: string) {
    var splitedFilename = fileName.split(".");
    return splitedFilename[splitedFilename.length - 1];
  }

  openAddAnswers(){
    this.displayAnswerForm = !this.displayAnswerForm;
  }

  onAnswerSubmit(){
    var formData = new FormData();
    formData.append('answerContent', this.answerForm.value.answerContent!);
    formData.append('isCorrect', this.answerForm.value.isCorrect!.toString());
    formData.append('lessonTaskId', this.taskId.toString());
    this.answerService.addAnswer(formData).subscribe(x => {
      this.getAnswers();
     });
    this.answerForm.reset();
    this.displayAnswerForm = !this.displayAnswerForm;
  }

  editAnswer(answer: Answer){
    this.editAnswermode = true;
    this.displayAnswerForm = true;

    this.answerForm.controls['answerContent'].setValue(answer.AnswerContent);
    this.answerForm.controls['isCorrect'].setValue(answer.IsCorrect);
    this.answerForm.controls['answerId'].setValue(answer.AnswerId!.toString());
  }

  onEditAnswerSubmit(){
    var formData = new FormData();
    formData.append('answerContent', this.answerForm.value.answerContent!);
    formData.append('isCorrect', this.answerForm.value.isCorrect!.toString());
    var answerId = this.answerForm.value.answerId!;
    this.answerService.updateAnswer(answerId, formData).subscribe(x => {
      this.getAnswers()
    });
    this.answerForm.reset();
    this.displayAnswerForm = !this.displayAnswerForm;
    this.editAnswermode = false;
  }

  deleteAnswer(answerId: number){
    this.answerService.deleteAnswer(answerId).subscribe(x => this.getAnswers());
  }
  cancelAnswer(){
    this.displayAnswerForm = !this.displayAnswerForm;
    this.editAnswermode = false;
    this.answerForm.reset();
  }
  cancelTaskUpadate(){
    this.update = false;
  }
  removeImage(){
    this.tempFilename = undefined;
  }
}
