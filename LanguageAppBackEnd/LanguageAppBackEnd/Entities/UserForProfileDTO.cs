using System.ComponentModel.DataAnnotations;
using Xunit.Sdk;

namespace LanguageAppBackEnd.Entities
{
    public class UserForProfileDTO
    {
        public string UserId { get; set; }

        [Required(ErrorMessage = "Vardas privalomas")]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "Pavardė privaloma")]
        public string? LastName { get; set; }
    }
}
