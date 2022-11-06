using LanguageAppBackEnd.dto;
using LanguageAppBackEnd.Models;

namespace LanguageAppBackEnd.Entities
{
    public class LessonDTO
    {
        public int? lessonId { get; set; }
        public string? userId { get; set; }
        public string lessonTitle { get; set; }
        public int? status { get; set; }
        public DateTime? createdDate { get; set; }
        public lessonTask[]? tasks  { get; set; }
    }
}
