namespace LanguageAppBackEnd.Models
{
    public class CategoryWord
    {
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public int WordPhraseId { get; set; }
        public WordPhrase WordPhrase { get; set; }

    }
}
