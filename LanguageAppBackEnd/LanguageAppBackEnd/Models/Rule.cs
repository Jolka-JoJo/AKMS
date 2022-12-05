using System.ComponentModel.DataAnnotations;

namespace LanguageAppBackEnd.Models
{
    public class Rule
    {
        [Key]
        public int RuleId { get; set; }

        public string ruleTitle { get; set; }

        public string? ruleContent { get; set; }

        public string? ruleImage { get; set; }

        public virtual ICollection<UserRule> UserRules { get; set; }

        public virtual ICollection<LessonRule> LessonRules { get; set; }

    }
}
