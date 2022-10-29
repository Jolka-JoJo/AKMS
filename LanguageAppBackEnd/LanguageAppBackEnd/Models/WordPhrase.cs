using System.ComponentModel.DataAnnotations;

namespace LanguageAppBackEnd.Models
{
    public class WordPhrase
    {
        public WordPhrase()
        {
            this.users = new HashSet<User>();
        }
        [Key]
        public int wordPhraseId { get; set; }
        public string wordPhraseContent { get; set; }
        public string? definition { get; set; }
        public string? wordPhraseImage { get; set; }
        public ICollection<Translation> translations { get; set; }
        public virtual ICollection<User> users { get; set; }


    }
}
