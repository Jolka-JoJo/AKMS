using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguageAppBackEnd.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lessons",
                columns: table => new
                {
                    lessonId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    lessonTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<int>(type: "int", nullable: false),
                    createdDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lessons", x => x.lessonId);
                });

            migrationBuilder.CreateTable(
                name: "Task",
                columns: table => new
                {
                    taskId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    taskTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    taskType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    taskContent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    taskImage = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Task", x => x.taskId);
                });

            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    AnswerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AnswerContent = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsCorrect = table.Column<bool>(type: "bit", nullable: false),
                    lessonTaskId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.AnswerId);
                    table.ForeignKey(
                        name: "FK_Answers_Task_lessonTaskId",
                        column: x => x.lessonTaskId,
                        principalTable: "Task",
                        principalColumn: "taskId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LessonLessonTask",
                columns: table => new
                {
                    lessonslessonId = table.Column<int>(type: "int", nullable: false),
                    taskstaskId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonLessonTask", x => new { x.lessonslessonId, x.taskstaskId });
                    table.ForeignKey(
                        name: "FK_LessonLessonTask_Lessons_lessonslessonId",
                        column: x => x.lessonslessonId,
                        principalTable: "Lessons",
                        principalColumn: "lessonId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LessonLessonTask_Task_taskstaskId",
                        column: x => x.taskstaskId,
                        principalTable: "Task",
                        principalColumn: "taskId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answers_lessonTaskId",
                table: "Answers",
                column: "lessonTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_LessonLessonTask_taskstaskId",
                table: "LessonLessonTask",
                column: "taskstaskId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropTable(
                name: "LessonLessonTask");

            migrationBuilder.DropTable(
                name: "Lessons");

            migrationBuilder.DropTable(
                name: "Task");
        }
    }
}
