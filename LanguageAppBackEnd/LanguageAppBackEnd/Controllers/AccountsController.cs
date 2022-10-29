using AutoMapper;
using LanguageAppBackEnd.dto;
using LanguageAppBackEnd.Entities;
using LanguageAppBackEnd.JwtFeatures;
using LanguageAppBackEnd.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace LanguageAppBackEnd.Controllers
{
    [Route("api/accounts")]
    [ApiController]

    public class AccountsController : Controller
    {
        private UserManager<User> _userManager {get; set;}
        private IMapper _mapper {get; set;}
        private JwtHandler _jwtHandler {get; set;}
        public AccountsController(IMapper mapper, UserManager<User> userManager, JwtHandler jwtHandler)
        {
            _mapper = mapper;
            _userManager = userManager;
            _jwtHandler = jwtHandler;
        }

        [HttpPost("Registration")]
        public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDTO userForRegistration)
        {
            if (userForRegistration == null || !ModelState.IsValid)
                return BadRequest();

            var user = _mapper.Map<User>(userForRegistration);

            var result = await _userManager.CreateAsync(user, userForRegistration.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);

                return BadRequest(new RegistrationResponseDTO { Errors = errors });
            }
            await _userManager.AddToRoleAsync(user, userForRegistration.Role);

            return StatusCode(201);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserForAuthenticationDTO userForAuthentication)
        {
            var user = await _userManager.FindByNameAsync(userForAuthentication.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, userForAuthentication.Password))
                return Unauthorized(new AuthResponseDTO { ErrorMessage = "Invalid Authentication" });
            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = await _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new AuthResponseDTO { IsAuthSuccessful = true, Token = token });
        }

    }
}
