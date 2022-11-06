namespace LanguageAppBackEnd.Models
{
    public class UserLesson
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public int LessonId { get; set; }
        public Lesson Lesson { get; set; }
    }
}
