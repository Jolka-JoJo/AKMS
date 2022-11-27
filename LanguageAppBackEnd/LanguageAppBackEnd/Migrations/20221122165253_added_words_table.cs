using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LanguageAppBackEnd.Migrations
{
    public partial class added_words_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
      

            migrationBuilder.CreateTable(
                name: "WordPhrases",
                columns: table => new
                {
                    wordPhraseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    wordPhraseContent = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    definition = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    wordPhraseImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    usersId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WordPhrases", x => x.wordPhraseId);
                    table.ForeignKey(
                        name: "FK_WordPhrases_AspNetUsers_usersId",
                        column: x => x.usersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            
            migrationBuilder.CreateIndex(
                name: "IX_WordPhrases_usersId",
                table: "WordPhrases",
                column: "usersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WordPhrases");

        }
    }
}
