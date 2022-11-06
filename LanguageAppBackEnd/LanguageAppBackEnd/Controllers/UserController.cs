using LanguageAppBackEnd.dto;
using LanguageAppBackEnd.Entities;
using LanguageAppBackEnd.Interface;
using LanguageAppBackEnd.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceStack.Web;
using System.Threading.Tasks;

namespace LanguageAppBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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

        //[HttpGet("{id}")]
        //public async Task<ActionResult<User>> GetUser(string id)
        //{
        //    var user = await _context.Users.FindAsync(id);
        //    if (user == null)
        //        return BadRequest("User not found.");
        //    return Ok(user);
        //}

        [HttpGet("{username}")]
        public async Task<ActionResult<User>> GetByUsername(string username)
        {
            var user = _context.Users.Where(x => x.UserName == username);
           // var user = await _context.Users.FindAsync(username);
            if (user == null)
                return BadRequest("User not found.");
            return Ok(user.First());
        }

        //[HttpPost]
        //public async Task<ActionResult> AddUser([FromForm] UserDTO request)
        //{
        //    try
        //    {
        //        User user = new User();
        //        //user.role = request.role;
        //        user.UserName = request.username;
        //        //user.Password = ( request.password);
        //        user.LastName = request.surname;
        //        user.FirstName = request.name;
        //        user.userImage = request.userImage;
        //        user.Email = request.email;
        //        _context.Users.Add(user);
        //        await _context.SaveChangesAsync();

        //    }
        //    catch (Exception e)
        //    {

        //    }

        //    return Ok(await _context.Users.ToListAsync());
        //}

        [HttpPut("profile")]
        public async Task<ActionResult<List<User>>> UpdateUser([FromBody] UserForProfileDTO request)
        {
            var dbUser = await _context.Users.FindAsync(request.UserId);
            if (dbUser == null)
                return BadRequest("Toks naudotojas neegzistuoja");

            dbUser.FirstName = request.FirstName;
            dbUser.LastName = request.LastName;

            await _context.SaveChangesAsync();

            return Ok(dbUser);
        }
        [HttpPut("password")]
        public async Task<ActionResult<List<User>>> UpdateUserPassword([FromBody] UserPasswordDTO request)
        {
            if (request == null || !ModelState.IsValid)
                return BadRequest();

            if (request.NewPassword.Length < 7)
                return BadRequest("Slaptažodį turi sudaryti bent 7 simboliai.");

            var dbUser = await _context.Users.FindAsync(request.UserId);
            if (dbUser == null)
                return BadRequest("Toks naudotojas neegzistuoja");

            if (!PasswordHashing.VerifyHashedPassword(dbUser.Password, request.Password))
                return BadRequest("Neteisingas slaptažodis.");

            dbUser.Password = PasswordHashing.HashPassword(request.NewPassword);

            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> DeleteUser(string id)
        {
            var dbUser = await _context.Users.FindAsync(id);
            if (dbUser == null)
                return BadRequest("User not found");

            _context.Users.Remove(dbUser);
            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }
    }
}
