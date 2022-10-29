using System.ComponentModel.DataAnnotations;

namespace LanguageAppBackEnd.Models
{
    public class Answer
    {
        [Key]
        public int AnswerId { get; set; }

        public string AnswerContent { get; set; }

        public bool IsCorrect { get; set; }

        public int lessonTaskId { get; set; }

        public lessonTask lessonTask { get; set; }
    }
}
