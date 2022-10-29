namespace LanguageAppBackEnd.dto
{
    public class AnswerDTO
    {
        public string answerContent { get; set; }
        public bool isCorrect { get; set; } 
        public int lessonTaskId { get; set; }
    }
}
