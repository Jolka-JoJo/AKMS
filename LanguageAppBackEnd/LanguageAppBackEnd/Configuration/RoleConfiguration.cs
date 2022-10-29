using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace LanguageAppBackEnd.Configuration
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData(
            new IdentityRole
            {
                Name = "Student",
                NormalizedName = "STUDENT"
            },
            new IdentityRole
            {
                Name = "teacher",
                NormalizedName = "TEACHER"
            });
        }
    }
}
