using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguageAppBackEnd.Migrations
{
    public partial class added_translation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "wordPhraseImage",
                table: "WordPhrases");

            migrationBuilder.AddColumn<string>(
                name: "translation",
                table: "WordPhrases",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "translation",
                table: "WordPhrases");

            migrationBuilder.AddColumn<string>(
                name: "wordPhraseImage",
                table: "WordPhrases",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
