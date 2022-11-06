using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguageAppBackEnd.Migrations
{
    public partial class manyToManyLessonTask : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LessonlessonTask");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3fce100b-f089-46ba-a850-82b218cdf7bf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bec4e7dd-389c-4385-8444-f27d02df0702");

            migrationBuilder.CreateTable(
                name: "LessonTaskLesson",
                columns: table => new
                {
                    TaskId = table.Column<int>(type: "int", nullable: false),
                    LessonId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonTaskLesson", x => new { x.LessonId, x.TaskId });
                    table.ForeignKey(
                        name: "FK_LessonTaskLesson_Lessons_LessonId",
                        column: x => x.LessonId,
                        principalTable: "Lessons",
                        principalColumn: "lessonId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LessonTaskLesson_Task_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Task",
                        principalColumn: "taskId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "994d9f28-32da-4c94-92e5-755e96ffb34b", "37b047dc-f924-4022-8dfb-1ebbb7bd8bc9", "teacher", "TEACHER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d8ee2290-7d34-4fed-aa2c-16af299da0e4", "3e620b6c-061b-43da-8829-49af6401b8c3", "Student", "STUDENT" });

            migrationBuilder.CreateIndex(
                name: "IX_LessonTaskLesson_TaskId",
                table: "LessonTaskLesson",
                column: "TaskId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LessonTaskLesson");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "994d9f28-32da-4c94-92e5-755e96ffb34b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d8ee2290-7d34-4fed-aa2c-16af299da0e4");

            migrationBuilder.CreateTable(
                name: "LessonlessonTask",
                columns: table => new
                {
                    lessonslessonId = table.Column<int>(type: "int", nullable: false),
                    taskstaskId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonlessonTask", x => new { x.lessonslessonId, x.taskstaskId });
                    table.ForeignKey(
                        name: "FK_LessonlessonTask_Lessons_lessonslessonId",
                        column: x => x.lessonslessonId,
                        principalTable: "Lessons",
                        principalColumn: "lessonId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LessonlessonTask_Task_taskstaskId",
                        column: x => x.taskstaskId,
                        principalTable: "Task",
                        principalColumn: "taskId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "3fce100b-f089-46ba-a850-82b218cdf7bf", "0309a270-1de1-4fca-8fe0-cf77fb0f9b25", "Student", "STUDENT" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "bec4e7dd-389c-4385-8444-f27d02df0702", "c6c8513f-14bc-4843-a3f3-0571f4f893fa", "teacher", "TEACHER" });

            migrationBuilder.CreateIndex(
                name: "IX_LessonlessonTask_taskstaskId",
                table: "LessonlessonTask",
                column: "taskstaskId");
        }
    }
}
