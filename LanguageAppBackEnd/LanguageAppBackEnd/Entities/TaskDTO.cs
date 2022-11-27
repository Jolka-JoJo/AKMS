using Microsoft.AspNetCore.Mvc;

namespace LanguageAppBackEnd.dto
{
    
    public class TaskDTO
    {
        public IFormFile? file { get; set; }

        public string taskTitle { get; set; }

        public string? taskType { get; set; }

        public bool? removeFile { get; set; }

        public string? taskContent { get; set; }

        public string? userId { get; set; }

        public string? learned { get; set; }


    }
}
