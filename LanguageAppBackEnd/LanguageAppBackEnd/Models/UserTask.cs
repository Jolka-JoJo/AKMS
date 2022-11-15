namespace LanguageAppBackEnd.Models
{
    public class UserTask
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public int TaskId { get; set; }
        public lessonTask Task { get; set; }
        public bool? learned { get; set; }
    }
}
