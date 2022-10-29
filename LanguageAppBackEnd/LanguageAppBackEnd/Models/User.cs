using Microsoft.AspNetCore.Identity;
using ServiceStack.DataAnnotations;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Xunit;
using Xunit.Abstractions;
using Xunit.Sdk;
using RequiredAttribute = System.ComponentModel.DataAnnotations.RequiredAttribute;

namespace LanguageAppBackEnd.Models
{
    public class User : IdentityUser
    {
        [Key]
        public int userId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string? userImage { get; set; }

    }
}
