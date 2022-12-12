using LanguageAppBackEnd.dto;
using LanguageAppBackEnd.Models;

namespace LanguageAppBackEnd.Entities
{
    public class RuleDTO
    {
        public int? RuleId { get; set; }
        public string? ruleTitle { get; set; }
        public string? ruleContent { get; set; }
        public string? ruleImage { get; set; }
        public IFormFile? file { get; set; }
        public string userId { get; set; }
        public List<UserDTO>? users { get; set; }
        public List<LessonDTO>? lessons { get; set; }
        public bool? isSaved { get; set; }

    }
}
