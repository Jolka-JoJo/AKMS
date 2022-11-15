using Microsoft.AspNetCore.Identity;

namespace LanguageAppBackEnd.Models
{
    public class Role : IdentityRole
    {
        public ICollection<UserRole> UserRole { get; set; }

    }
}
