using LanguageAppBackEnd.dto;
using LanguageAppBackEnd.Interface;
using LanguageAppBackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LanguageAppBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            return Ok( await _context.Users.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return BadRequest("User not found.");
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult> AddUser([FromForm] UserDTO request)
        {
            try
            {
                User user = new User();
                //user.role = request.role;
                user.UserName = request.username;
                //user.Password = ( request.password);
                user.LastName = request.surname;
                user.FirstName = request.name;
                user.userImage = request.userImage;
                user.Email = request.email;
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

            }
            catch (Exception e)
            {

            }

            return Ok(await _context.Users.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<User>>> UpdateUser(int id, [FromBody] UserDTO request)
        {
            var dbUser = await _context.Users.FindAsync(id);
            if (dbUser == null)
                return BadRequest("User not found.");
            dbUser.UserName = request.username;
            dbUser.Password = request.password;
            dbUser.LastName = request.surname;
            dbUser.FirstName = request.name;
            dbUser.userImage = request.userImage;
            dbUser.Email = request.email;


            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }

        /*[HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> DeleteUser(int id)
        {
            var dbAnswer = await _context.Answers.FindAsync(id);
            if (dbAnswer == null)
                return BadRequest("Answer not found.");

            _context.Answers.Remove(dbAnswer);
            await _context.SaveChangesAsync();

            return Ok(await _context.Answers.ToListAsync());
        }*/
    }
}
