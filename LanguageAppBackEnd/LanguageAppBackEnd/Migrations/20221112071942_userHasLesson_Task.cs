using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguageAppBackEnd.Migrations
{
    public partial class userHasLesson_Task : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3390777c-30d9-415c-a24d-63408a0177fd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8e58f7e7-a0ed-43b4-a8f0-cee87dd5ac9f");

            migrationBuilder.AddColumn<bool>(
                name: "learned",
                table: "UserTask",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "assignedDate",
                table: "UserLesson",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "completedDate",
                table: "UserLesson",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "score",
                table: "UserLesson",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "status",
                table: "UserLesson",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "63428096-cbef-4d6f-8e9e-b6fe50cfaea8", "3b9a0b72-b7f9-4a8b-afdf-c002ef2bad5e", "Student", "STUDENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "b348396a-d456-4bca-9985-17c94ce98901", "6f66ea88-cf93-41c6-a167-706ebbb1e491", "teacher", "TEACHER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "63428096-cbef-4d6f-8e9e-b6fe50cfaea8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b348396a-d456-4bca-9985-17c94ce98901");

            migrationBuilder.DropColumn(
                name: "learned",
                table: "UserTask");

            migrationBuilder.DropColumn(
                name: "assignedDate",
                table: "UserLesson");

            migrationBuilder.DropColumn(
                name: "completedDate",
                table: "UserLesson");

            migrationBuilder.DropColumn(
                name: "score",
                table: "UserLesson");

            migrationBuilder.DropColumn(
                name: "status",
                table: "UserLesson");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "3390777c-30d9-415c-a24d-63408a0177fd", "dbde60b3-7583-4eda-af55-b1be95bb2e5e", "Student", "STUDENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "8e58f7e7-a0ed-43b4-a8f0-cee87dd5ac9f", "03a40941-e1d7-437e-b57b-01b48c313c85", "teacher", "TEACHER" });
        }
    }
}
