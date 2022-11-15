namespace LanguageAppBackEnd.Entities
{
    public class RemoveFromLessonDTO
    {
        public int lessonId { get; set; }
        public int? taskId { get; set; }
        public string? userId { get; set; }
    }
}
