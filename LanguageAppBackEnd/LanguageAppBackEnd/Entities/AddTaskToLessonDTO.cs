namespace LanguageAppBackEnd.Entities
{
    public class AddTaskToLessonDTO
    {
        public int lessonId {get; set;}
        public List<int> tasksIds {get; set;}
    }
}
