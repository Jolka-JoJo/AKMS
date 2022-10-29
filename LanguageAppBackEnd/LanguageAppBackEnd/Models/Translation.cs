using System.ComponentModel.DataAnnotations;

namespace LanguageAppBackEnd.Models
{
    public class Translation
    {
        [Key]
        public int translationId { get; set; }
        public string translationContent { get; set; }

        public int wordPhraseId { get; set; }
        public WordPhrase WordPhrase { get; set; }
    }
}
