import { RuleService } from './../../services/rule/rule.service';
import { UserService } from './../../services/user/user.service';
import { Rule } from './../../interfaces/rule';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-rule-to-lesson-dialog',
  templateUrl: './add-rule-to-lesson-dialog.component.html',
  styleUrls: ['./add-rule-to-lesson-dialog.component.scss']
})
export class AddRuleToLessonDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddRuleToLessonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private ruleService: RuleService
    ) {
    this.userService.getUser().subscribe(res =>{
      this.ruleService.getAllRules(res.Id, data.idsToFilter).subscribe(res => {
        this.rules = res;
        this.dataSource = new MatTableDataSource(this.rules);
        this.dataSource.paginator = this.paginator;
      });
    }); }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<Rule>;
  selection = new SelectionModel<Rule>(true, []);
  displayedColumns: string[] = ['select', 'Nr', 'Rule', "RuleContent"];
  rules: Rule[] = [];

  ngOnInit(): void {

  }

  confirm(){
    this.dialogRef.close(this.selection.selected);
  }

  onCancel(): void {
    this.dialogRef.close();
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

  checkboxLabel(row?: Rule): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position! + 1}`;
  }
}
