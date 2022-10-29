

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
    }
}
