import { category } from './../../interfaces/dictionary';

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-category-choice-dialog',
  templateUrl: './category-choice-dialog.component.html',
  styleUrls: ['./category-choice-dialog.component.scss']
})
export class CategoryChoiceDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CategoryChoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.dataSource = new MatTableDataSource(data.categories);
    }

  displayedColumns: string[] = ['select', 'Nr', 'CategoryName'];

  dataSource!: MatTableDataSource<category>;
  selection = new SelectionModel<category>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
  }

  confirm(){
    this.dialogRef.close(this.selection.selected);
  }

  // onCancel(): void {
  //   this.dialogRef.close();
  // }
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

  checkboxLabel(row?: category): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position! + 1}`;
  }
}
