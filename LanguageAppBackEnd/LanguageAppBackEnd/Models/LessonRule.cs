namespace LanguageAppBackEnd.Models
{
    public class LessonRule
    {
        public int LessonId { get; set; }
        public Lesson Lesson { get; set; }
        public int RuleId { get; set; }
        public Rule Rule { get; set; }
    }
}
