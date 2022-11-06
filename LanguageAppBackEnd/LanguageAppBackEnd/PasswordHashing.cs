using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace LanguageAppBackEnd
{
    public class PasswordHashing
    {
        public static string HashPassword(string password)
        {
            //byte[] salt;
            //byte[] buffer2;
            //if (password == null)
            //{
            //    throw new ArgumentNullException("password");
            //}
            //using (Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes(password, 0x10, 0x3e8))
            //{
            //    salt = bytes.Salt;
            //    buffer2 = bytes.GetBytes(0x20);
            //}
            //byte[] dst = new byte[0x31];
            //Buffer.BlockCopy(salt, 0, dst, 1, 0x10);
            //Buffer.BlockCopy(buffer2, 0, dst, 0x11, 0x20);
            // Generate a 128-bit salt using a sequence of
            // cryptographically strong random bytes.
            byte[] encData_byte = new byte[password.Length];
            encData_byte = System.Text.Encoding.UTF8.GetBytes(password);
            string encodedData = Convert.ToBase64String(encData_byte);
            return encodedData;
            //return Convert.ToBase64String(dst);
        }

        public static bool VerifyHashedPassword(string hashedPassword, string password)
        {
            //byte[] buffer4;
            //if (hashedPassword == null)
            //{
            //    return false;
            //}
            //if (password == null)
            //{
            //    throw new ArgumentNullException("password");
            //}
            //byte[] src = Convert.FromBase64String(hashedPassword);
            //if ((src.Length != 0x31) || (src[0] != 0))
            //{
            //    return false;
            //}
            //byte[] dst = new byte[0x10];
            //Buffer.BlockCopy(src, 1, dst, 0, 0x10);
            //byte[] buffer3 = new byte[0x20];
            //Buffer.BlockCopy(src, 0x11, buffer3, 0, 0x20);
            //using (Rfc2898DeriveBytes bytes = new Rfc2898DeriveBytes(password, dst, 0x3e8))
            //{
            //    buffer4 = bytes.GetBytes(0x20);
            //}
            System.Text.UTF8Encoding encoder = new System.Text.UTF8Encoding();
            System.Text.Decoder utf8Decode = encoder.GetDecoder();
            byte[] todecode_byte = Convert.FromBase64String(hashedPassword);
            int charCount = utf8Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);
            char[] decoded_char = new char[charCount];
            utf8Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);
            string result = new String(decoded_char);
            return result == password;
        }
        //public static bool ByteArraysEqual(byte[] b1, byte[] b2)
        //{
        //    if (b1 == b2) return true;
        //    if (b1 == null || b2 == null) return false;
        //    if (b1.Length != b2.Length) return false;
        //    for (int i = 0; i < b1.Length; i++)
        //    {
        //        if (b1[i] != b2[i]) return false;
        //    }
        //    return true;
        //}
    }
}
