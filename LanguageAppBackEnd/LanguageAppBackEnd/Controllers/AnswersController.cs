using LanguageAppBackEnd.dto;
using LanguageAppBackEnd.Facades;
using LanguageAppBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace LanguageAppBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswersController : ControllerBase 
    {
        private readonly DataContext _context;

        public AnswersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{taskId}")]
        public async Task<ActionResult<List<Answer>>> GetAllTaskAnswers(int taskId)
        {
            return Ok(_context.Answers.Where(x => x.lessonTaskId == taskId).ToList());
        }

        [HttpGet("{taskId}/{id}")]
        public async Task<ActionResult<Answer>> GetAnswer(int id)
        {
            var answer = await _context.Answers.FindAsync(id);
            if (answer == null)
                return BadRequest("Answer not found.");
            return Ok(answer);
        }

        [HttpPost]
        public async Task<ActionResult> AddAnswer([FromForm] AnswerDTO request)
        {
            try
            {
                Answer answer = new Answer();
                answer.AnswerContent = request.answerContent;
                answer.IsCorrect = request.isCorrect;
                answer.lessonTaskId = request.lessonTaskId;
                _context.Answers.Add(answer);
                await _context.SaveChangesAsync();

            }
            catch (Exception e)
            {

            }

            return Ok(await _context.Answers.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Answer>>> UpdateAnswer(int id, [FromForm] AnswerDTO request)
        {
            var dbAnswer = await _context.Answers.FindAsync(id);
            if (dbAnswer == null)
                return BadRequest("Answer not found.");

            dbAnswer.AnswerContent = request.answerContent;
            dbAnswer.IsCorrect = request.isCorrect;

            await _context.SaveChangesAsync();

            return Ok(await _context.Answers.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Answer>>> DeleteTask(int id)
        {
            var dbAnswer = await _context.Answers.FindAsync(id);
            if (dbAnswer == null)
                return BadRequest("Answer not found.");

            _context.Answers.Remove(dbAnswer);
            await _context.SaveChangesAsync();

            return Ok(await _context.Answers.ToListAsync());
        }
    }
}
