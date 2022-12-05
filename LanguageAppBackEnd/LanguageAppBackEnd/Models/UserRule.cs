namespace LanguageAppBackEnd.Models
{
    public class UserRule
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public int RuleId { get; set; }
        public Rule Rule { get; set; }
    }
}
