using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace LanguageAppBackEnd
{
    public class PasswordHashing
    {
        public static string HashPassword(string password)
        {
            byte[] salt = BitConverter.GetBytes(1955668);
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password!,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));
            return hashed;
        }

        public static bool VerifyHashedPassword(string hashedPassword, string password)
        {           
            return hashedPassword == HashPassword(password);
        }
    }
}
