using LanguageAppBackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace LanguageAppBackEnd.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;
        public UserService(DataContext context)
        {
            _context = context;
        }


        public bool ValidateCredentials(string username, string password)
        {
            var a = _context.Users.Where(x => x.UserName == username && x.Password == password).ToListAsync();
            a.Wait();
            return a.Result.Count != 0 ? true : false;
        }
    }
}
