using LanguageAppBackEnd.Models;

namespace LanguageAppBackEnd.Entities
{
    public class DictionaryDTO
    {
        public int? wordPhraseId { get; set; }
        public string wordPhraseContent { get; set; }
        public string? definition { get; set; }
        public string translation { get; set; }
        public string? userId { get; set; }
        public List<int>? categories{ get; set; }
        public List<CategoryDTO>? categoriesList{ get; set; }
        public List<CategoryDTO>? newCategories{ get; set; }
}
}
