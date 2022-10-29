using System.ComponentModel.DataAnnotations;

namespace LanguageAppBackEnd.Entities
{
    public class UserForAuthenticationDTO
    {
        [Required(ErrorMessage = "Email is required.")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        public string? Password { get; set; }
    }
}
