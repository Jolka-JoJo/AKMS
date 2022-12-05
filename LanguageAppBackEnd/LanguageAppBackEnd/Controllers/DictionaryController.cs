using Abp.Collections.Extensions;
using AutoMapper;
using LanguageAppBackEnd.Entities;
using LanguageAppBackEnd.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace LanguageAppBackEnd.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class DictionaryController : Controller
    {
        private readonly DataContext _context;
        public DictionaryController(DataContext context)
        {
            _context = context;
        }
        [HttpPost("all/{userId}")]
        public async Task<ActionResult<List<WordPhrase>>> GetAllWordsPhrases(string userId, [FromBody] int[] filter)
        {
            var dbWords = _context.WordPhrases.Where(x => x.userId == userId).ToList();

            var data = (from word in _context.WordPhrases
                        join categoryWord1 in _context.CategoryWords 
                        on word.wordPhraseId equals categoryWord1.WordPhraseId into CW
                        from categoryWord2 in CW.DefaultIfEmpty()
                        join category in _context.Categories
                        on categoryWord2.CategoryId equals category.CategoryId into CW2
                        from categoryWord3 in CW2.DefaultIfEmpty()
                        where word.userId == userId
                             select new
                             {
                                 definition = word.definition ?? string.Empty,
                                 word.translation,
                                 word.wordPhraseContent,
                                 word.userId,
                                 word.wordPhraseId,
                                 CategoryId = categoryWord3.CategoryId.ToString() ?? string.Empty,
                                 CategoryName = categoryWord3.CategoryName ?? string.Empty
                             }
                              ).ToList();

            if (filter.Length > 0)
            {
                data = data.Where(value => filter.Any(categoryId => categoryId.ToString() == value.CategoryId)).ToList();
            }

            List<DictionaryDTO> dictionary = new List<DictionaryDTO>();

            foreach (var values in data)
            {

                var valueExist = dictionary.Find(x => x.wordPhraseId == values.wordPhraseId);
                if (valueExist == null)
                {
                    DictionaryDTO word = new DictionaryDTO();
                    word.wordPhraseId = values.wordPhraseId;
                    word.translation = values.translation;
                    word.definition = values.definition;
                    word.wordPhraseContent = values.wordPhraseContent;
                    word.userId = values.userId;
                    word.categoriesList = new List<CategoryDTO>();
                    if (values.CategoryId != "")
                    {
                        CategoryDTO category = new CategoryDTO();
                        category.CategoryId = int.Parse(values.CategoryId);
                        category.CategoryName = values.CategoryName;
                        word.categoriesList.Add(category);

                    }

                    dictionary.Add(word);
                }
                else
                {
                    if (values.CategoryId != "")
                    {
                        CategoryDTO category = new CategoryDTO();
                        category.CategoryId = int.Parse(values.CategoryId);
                        category.CategoryName = values.CategoryName;
                        valueExist.categoriesList.Add(category);

                    }
                }
            }

            return Ok(dictionary);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WordPhrase>> GetWordPhrase(int id)
        {
            return Ok(_context.WordPhrases.FindAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<List<WordPhrase>>> AddWordPhrase([FromBody] DictionaryDTO request)
        {

            List<int> tempCategories = request.categories ?? new List<int>();
            if (request.newCategories.Count > 0)
            {
                foreach (var newCategory in request.newCategories)
                {
                    Category category = new Category();
                    category.CategoryName = newCategory.CategoryName;
                    category.UserId = request.userId;
                    _context.Categories.Add(category);
                    _context.SaveChanges();
                    var categoryId = category.CategoryId;
                    tempCategories.Add(categoryId);
                }
            }

            WordPhrase wordPhrase = new WordPhrase();
            wordPhrase.definition = request.definition;
            wordPhrase.wordPhraseContent = request.wordPhraseContent;
            wordPhrase.userId = request.userId;
            wordPhrase.translation = request.translation;

            _context.WordPhrases.Add(wordPhrase);
             _context.SaveChanges();
            var wordId = wordPhrase.wordPhraseId;


            if (tempCategories.Count > 0)
            {
                foreach (var category in tempCategories)
                {
                    CategoryWord categoryWord = new CategoryWord();
                    categoryWord.CategoryId = category;
                    categoryWord.WordPhraseId = wordId;
                    _context.CategoryWords.Add(categoryWord);
                    _context.SaveChanges();
                }
            }

            return Ok(_context.WordPhrases.Where(x => x.userId == request.userId).ToList());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<WordPhrase>>> UpdateWordPhrase([FromBody] DictionaryDTO request, int id)
        {
            var dbWord = await _context.WordPhrases.FindAsync(id);
            if(dbWord == null)
            {
                return BadRequest();
            }

            List<int> tempCategories = request.categories ?? new List<int>();
            List<CategoryDTO> newCategories = request.newCategories ?? new List<CategoryDTO>();
            if (newCategories.Count > 0)
            {
                foreach (var newCategory in newCategories)
                {
                    Category category = new Category();
                    category.CategoryName = newCategory.CategoryName;
                    category.UserId = request.userId;
                    _context.Categories.Add(category);
                     _context.SaveChanges();
                    var categoryId = category.CategoryId;
                    tempCategories.Add(categoryId);
                }
            }
            dbWord.definition = request.definition;
            dbWord.wordPhraseContent = request.wordPhraseContent;
            dbWord.translation = request.translation;
             _context.SaveChanges();


            if (tempCategories.Count > 0)
            {
                var wordsCategories = _context.CategoryWords.Where(x => x.WordPhraseId == request.wordPhraseId).ToList();

                foreach (var category in tempCategories)
                {
                    if (wordsCategories.Find(x => x.CategoryId == category) != null) continue;
                    CategoryWord categoryWord = new CategoryWord();
                    categoryWord.CategoryId = category;
                    categoryWord.WordPhraseId = dbWord.wordPhraseId;
                    _context.CategoryWords.Add(categoryWord);
                    _context.SaveChanges();
                }

                foreach (var category in wordsCategories)
                {
                    var temp = tempCategories.Find(x => x == category.CategoryId);
                    Console.WriteLine(temp);
                    if (tempCategories.Find(x => x == category.CategoryId) != 0) continue;
                    _context.CategoryWords.Remove(category);

                    _context.SaveChanges();
                }
            }


            return Ok();
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<List<WordPhrase>>> DeleteWordPhrase(int id)
        { 
            var wordPhrase = await _context.WordPhrases.FindAsync(id);
            if (wordPhrase == null)
            {
                return BadRequest();
            }
            _context.WordPhrases.Remove(wordPhrase);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
