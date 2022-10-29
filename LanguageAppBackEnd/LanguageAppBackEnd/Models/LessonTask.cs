using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Security.Cryptography;

namespace LanguageAppBackEnd.Models
{
    public class lessonTask
    {
        public lessonTask()
        {
            this.lessons = new HashSet<Lesson>();
        }

        [Key]
        public int taskId { get; set; }
        
        public string taskTitle { get; set; }

        public int? taskType { get; set; } = 1;
        
        public string? taskContent { get; set; }
        
        public string? taskImage { get; set; }

        public ICollection<Answer> answers { get; set; }

        public virtual ICollection<Lesson> lessons { get; set; }

    }
}
