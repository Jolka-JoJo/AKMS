namespace LanguageAppBackEnd.Models
{
    public class LessonTaskLesson
    {
        public int TaskId { get; set; }
        public lessonTask Task { get; set; }
        public int LessonId { get; set; }
        public Lesson Lesson { get; set; }
    }
}
