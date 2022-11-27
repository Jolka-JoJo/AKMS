using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguageAppBackEnd.Migrations
{
    public partial class added_userId_col_dictionary : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WordPhrases_AspNetUsers_usersId",
                table: "WordPhrases");

            migrationBuilder.DropIndex(
                name: "IX_WordPhrases_usersId",
                table: "WordPhrases");

            migrationBuilder.DropColumn(
                name: "usersId",
                table: "WordPhrases");

            migrationBuilder.AddColumn<string>(
                name: "userId",
                table: "WordPhrases",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_WordPhrases_userId",
                table: "WordPhrases",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_WordPhrases_AspNetUsers_userId",
                table: "WordPhrases",
                column: "userId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WordPhrases_AspNetUsers_userId",
                table: "WordPhrases");

            migrationBuilder.DropIndex(
                name: "IX_WordPhrases_userId",
                table: "WordPhrases");

            migrationBuilder.DropColumn(
                name: "userId",
                table: "WordPhrases");

            migrationBuilder.AddColumn<string>(
                name: "usersId",
                table: "WordPhrases",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WordPhrases_usersId",
                table: "WordPhrases",
                column: "usersId");

            migrationBuilder.AddForeignKey(
                name: "FK_WordPhrases_AspNetUsers_usersId",
                table: "WordPhrases",
                column: "usersId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
