

using Abp.MimeTypes;

namespace LanguageAppBackEnd.Facades
{
    public class FileUploadind
    {
        public static async Task SaveFileAsync(string bussinesArea, int id, IFormFile file)
        {
        
            string savePath = "C:\\Users\\Jolanta\\Desktop\\KU\\kalbų mokymosi sistema\\LanguageAppFE\\LanguageAppFE\\src\\assets\\uploads\\";

            string fileName = bussinesArea + "_" + id;

            MimeTypeMap mimeType = new MimeTypeMap();
            savePath += fileName + mimeType.GetExtension(file.ContentType);

            using (Stream fileStream = new FileStream(savePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

        }

        public static async Task DeleteFileAsync(string bussinesArea, int id, string fileNameDB)
        {

            string path = "C:\\Users\\Jolanta\\Desktop\\KU\\kalbų mokymosi sistema\\LanguageAppFE\\LanguageAppFE\\src\\assets\\uploads\\";

            string fileName = bussinesArea + "_" + id;

            string extension = fileNameDB.Split('.').Last();
            path += fileName + "." + extension;

            if (File.Exists(path))
            {
                File.Delete(path);
            }

        }
    }
}
