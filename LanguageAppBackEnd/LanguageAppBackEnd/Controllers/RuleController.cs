using LanguageAppBackEnd.Entities;
using LanguageAppBackEnd.Facades;
using LanguageAppBackEnd.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace LanguageAppBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class RuleController : Controller
    {
        private readonly DataContext _context;
        public RuleController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("{userId}")]
        public async Task<ActionResult<List<Rule>>> GetAllRules([FromBody] int[] filter, string userId)
        {
            List<Rule> res = _context.UserRules
               .Include(x => x.Rule)
               .Where(entry => entry.UserId == userId)
               .Select(entry => entry.Rule).ToList();

            if (filter != null && filter.Length > 0)
            {
                // atfiltruot
            }

            return Ok(res);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Rule>> GetRule(int id)
        {
            return Ok(_context.Rules.FindAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<List<Rule>>> AddRule([FromForm] RuleDTO request)
        {
            Rule rule = new Rule();
            rule.ruleTitle = request.ruleTitle;
            rule.ruleContent = request.ruleContent;
            if (request.file != null) rule.ruleImage = request.file.FileName;

            _context.Rules.Add(rule);
            _context.SaveChanges();


            if (request.file != null)
            {
                int ruleId = rule.RuleId;
                await FileUploadind.SaveFileAsync("rule", ruleId, request.file);
            }

            UserRule userRule = new UserRule();
            userRule.UserId = request.userId;
            userRule.RuleId = rule.RuleId;
            _context.UserRules.Add(userRule);
            _context.SaveChanges();


            return _context.UserRules
               .Include(x => x.Rule)
               .Where(entry => entry.UserId == request.userId)
               .Select(entry => entry.Rule).ToList();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<WordPhrase>>> UpdateRule([FromForm] RuleDTO request, int id)
        {
            if (request == null || !ModelState.IsValid)
                return BadRequest();

            var dbRule = await _context.Rules.FindAsync(id);
            if (dbRule == null)
                return BadRequest("Rule not found.");

            dbRule.ruleTitle = request.ruleTitle;
            dbRule.ruleContent = request.ruleContent;
            if (request.file != null)
            {
                dbRule.ruleImage = request.file.FileName;
                await FileUploadind.SaveFileAsync("rule", id, request.file);
            }

            await _context.SaveChangesAsync();

            return Ok(dbRule);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<List<WordPhrase>>> DeleteRule(int id)
        {
            var dbRule = await _context.Rules.FindAsync(id);
            if (dbRule == null)
            {
                return BadRequest();
            }
            _context.Rules.Remove(dbRule);
            await _context.SaveChangesAsync();
            return Ok();
        }
    
    }
}
