using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace LanguageAppBackEnd.Models
{
    public class Lesson
    {
        [Key]
        public int lessonId { get; set; }
        public string lessonTitle { get; set; }
        public int status { get; set; } = 1;
        public DateTime createdDate { get; set; } = DateTime.Now;
        public virtual ICollection<LessonTaskLesson> LessonTaskLesson { get; set; }
        public virtual ICollection<UserLesson> UserLesson { get; set; }
    }
}
