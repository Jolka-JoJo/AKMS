using System.ComponentModel.DataAnnotations;
using Xunit.Sdk;

namespace LanguageAppBackEnd.Entities
{
    public class UserForRegistrationDTO
    {
        [Required(ErrorMessage = "Vardas privalomas")]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "Pavardė privaloma")]
        public string? LastName { get; set; }

        [Required(ErrorMessage = "Elektroninis paštas privalomas")]
        [EmailAddress(ErrorMessage = "Netinkamas elektroninio pašto formatas")]
        public string? Email { get; set; }

        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Slaptažodis privalomas")]
        public string? Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Slaptažodis nesutampa.")]
        public string? ConfirmPassword { get; set; }

        public string? Role { get; set; }

    }
}
