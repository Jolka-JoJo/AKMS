using System.ComponentModel.DataAnnotations;

namespace LanguageAppBackEnd.Models
{
    public class WordPhrase
    {
        [Key]
        public int wordPhraseId { get; set; }
        public string wordPhraseContent { get; set; }
        public string? definition { get; set; }
        public string translation { get; set; }
        public string? userId { get; set; }
        public User? user { get; set; }
        public virtual ICollection<CategoryWord> CategoryWords { get; set; }

    }
}
