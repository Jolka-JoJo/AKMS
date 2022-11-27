using System.ComponentModel.DataAnnotations;

namespace LanguageAppBackEnd.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public short? Area { get; set; }
        public virtual ICollection<CategoryWord> CategoryWords { get; set; }

    }
}
