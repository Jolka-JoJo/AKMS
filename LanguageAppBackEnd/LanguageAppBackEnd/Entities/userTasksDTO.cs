namespace LanguageAppBackEnd.Entities
{
    public class userTasksDTO
    {
        public string? userId { get; set; }
        //public Task[]? tasks { get; set; }
        public int[]? tasksToFilter { get; set; }
        public int[]? tasksIds { get; set; }
       // public bool? learned { get; set; }
    }
}
