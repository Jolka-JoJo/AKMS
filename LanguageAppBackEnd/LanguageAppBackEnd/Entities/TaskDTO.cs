using Microsoft.AspNetCore.Mvc;

namespace LanguageAppBackEnd.dto
{
    
    public class TaskDTO
    {
        //public int taskId { get; set; }
        public IFormFile? file { get; set; }

        public string taskTitle { get; set; }

        public string? taskType { get; set; }

        public bool? removeFile { get; set; }

        public string? taskContent { get; set; }

        //public string? taskImage { get; set; }

    }
}
