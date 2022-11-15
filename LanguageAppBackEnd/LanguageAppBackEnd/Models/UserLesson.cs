namespace LanguageAppBackEnd.Models
{
    public class UserLesson
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public int LessonId { get; set; }
        public Lesson Lesson { get; set; }
        public int status { get; set; } = 1;
        public int? score { get; set; }
        public DateTime? completedDate { get; set; }
        public DateTime? assignedDate { get; set; }
    }
}
