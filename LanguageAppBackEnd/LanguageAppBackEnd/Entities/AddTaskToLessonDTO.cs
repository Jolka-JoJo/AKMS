namespace LanguageAppBackEnd.Entities
{
    public class AddToLessonDTO
    {
        public int lessonId {get; set;}
        public List<int>? tasksIds {get; set;}
        public List<string>? usersIds {get; set;}
        public string? userId {get; set;}
        public List<int>? rulesIds {get; set;}
    }
}
