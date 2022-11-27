using LanguageAppBackEnd.Models;

namespace LanguageAppBackEnd.Entities
{
    public class CategoryDTO
    {
        public int? CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string? UserId { get; set; }
        public short? Area { get; set; }
    }
}
