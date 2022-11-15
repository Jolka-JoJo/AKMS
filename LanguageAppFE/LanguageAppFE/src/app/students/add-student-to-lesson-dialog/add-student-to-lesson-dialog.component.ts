import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { user } from 'src/app/models/task/user.module';
import { TasksService } from 'src/app/services/task/tasks.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-student-to-lesson-dialog',
  templateUrl: './add-student-to-lesson-dialog.component.html',
  styleUrls: ['./add-student-to-lesson-dialog.component.scss']
})
export class AddStudentToLessonDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AddStudentToLessonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TasksService,
    private userService: UserService) {
      this.userService.getAllStudents().subscribe(res =>{
        this.users = res;
        this.dataSource = new MatTableDataSource(this.users);
      })
    }

    displayedColumns: string[] = ['select', 'Nr', 'Student'];
    dataSource?: MatTableDataSource<user>;
    users?: user[];
    selection = new SelectionModel<user>(true, []);
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
    this.dataSource!.filter = filterValue.trim().toLowerCase();

    if (this.dataSource!.paginator) {
      this.dataSource!.paginator.firstPage();
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

    this.selection.select(...this.dataSource!.data);
  }

  checkboxLabel(row?: user): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position! + 1}`;
  }

}
