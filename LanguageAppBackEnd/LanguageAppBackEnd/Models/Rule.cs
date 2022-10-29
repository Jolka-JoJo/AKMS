using System.ComponentModel.DataAnnotations;

namespace LanguageAppBackEnd.Models
{
    public class Rule
    {
        [Key]
        public int ruleId { get; set; }

        public string ruleTitle { get; set; }

        public string? ruleContent { get; set; }

        public string? ruleImage { get; set; }
    }
}
