using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace LanguageAppBackEnd.Models
{
    public class Lesson
    {
        public Lesson()
        {
            this.tasks = new HashSet<lessonTask>();
        }

        [Key]
        public int lessonId { get; set; }
        public string lessonTitle { get; set; }
        public int status { get; set; } = 1;
        public DateTime createdDate { get; set; } = DateTime.Now;
        public virtual ICollection<lessonTask> tasks { get; set; }
    }
}
