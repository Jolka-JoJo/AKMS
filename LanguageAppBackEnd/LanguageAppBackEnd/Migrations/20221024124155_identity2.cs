using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguageAppBackEnd.Migrations
{
    public partial class identity2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "97452a6a-224d-4fc5-93ce-13fb6bdf4234");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dd344ad5-b892-4e2e-9132-6d4d66f16c3a");

            migrationBuilder.RenameColumn(
                name: "password",
                table: "AspNetUsers",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "surname",
                table: "AspNetUsers",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "AspNetUsers",
                newName: "FirstName");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "3fce100b-f089-46ba-a850-82b218cdf7bf", "0309a270-1de1-4fca-8fe0-cf77fb0f9b25", "Student", "STUDENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "bec4e7dd-389c-4385-8444-f27d02df0702", "c6c8513f-14bc-4843-a3f3-0571f4f893fa", "teacher", "TEACHER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3fce100b-f089-46ba-a850-82b218cdf7bf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bec4e7dd-389c-4385-8444-f27d02df0702");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "AspNetUsers",
                newName: "password");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "AspNetUsers",
                newName: "surname");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "AspNetUsers",
                newName: "name");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "97452a6a-224d-4fc5-93ce-13fb6bdf4234", "3ce14c48-e20f-4ad6-9bf4-0054f64add82", "Student", "STUDENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "dd344ad5-b892-4e2e-9132-6d4d66f16c3a", "01b78a6d-76df-47ca-ac4b-30b18df5f373", "teacher", "TEACHER" });
        }
    }
}
