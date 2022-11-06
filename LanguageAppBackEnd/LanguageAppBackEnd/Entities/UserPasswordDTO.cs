using System.ComponentModel.DataAnnotations;
using Xunit.Sdk;

namespace LanguageAppBackEnd.Entities
{
    public class UserPasswordDTO
    {
        public string UserId { get; set; }

        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Slaptažodis privalomas")]
        public string? Password { get; set; }

        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Naujas slaptažodis privalomas")]
        public string? NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Compare("NewPassword", ErrorMessage = "Naujas slaptažodis nesutampa.")]
        public string? ConfirmNewPassword { get; set; }
    }
}
