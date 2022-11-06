import { UserService } from 'src/app/services/user/user.service';
import { TasksService } from 'src/app/services/task/tasks.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LesssonTask } from 'src/app/models/task/task.module';
import { userTasksDTO } from 'src/app/interfaces/user';

export interface UserData {
  id: string;
  position: number;
  name: string;
  progress: string;
  fruit: string;
}

export interface TaskTable {
  taskTitle: number;
}

@Component({
  selector: 'app-add-task-to-lesson-dialog',
  templateUrl: './add-task-to-lesson-dialog.component.html',
  styleUrls: ['./add-task-to-lesson-dialog.component.scss']
})


export class AddTaskToLessonDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddTaskToLessonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TasksService,
    private userService: UserService)
  {
    var taskData : userTasksDTO = {
      tasksToFilter: data.idsToFilter
    }
    this.userService.getUser().subscribe(res =>{
      var taskData : userTasksDTO = {
        userId: res.Id,
        tasksToFilter: data.idsToFilter
      }
      this.taskService.getAllTasks(taskData).subscribe(res => {
        this.tasks = res;
        this.dataSource = new MatTableDataSource(this.tasks);
      });
    });
  }

    displayedColumns: string[] = ['select', 'Nr', 'Task'];
    tasks?: LesssonTask[] = [];

    dataSource!: MatTableDataSource<LesssonTask>;
    selection = new SelectionModel<LesssonTask>(true, []);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
  }

  confirm(){
    this.dialogRef.close(this.selection.selected);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    if(!this.dataSource || !this.dataSource.data) return;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: LesssonTask): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position! + 1}`;
  }
}
