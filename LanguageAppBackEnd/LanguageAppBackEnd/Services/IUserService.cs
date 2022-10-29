namespace LanguageAppBackEnd.Services
{
    public interface IUserService
    {
        bool ValidateCredentials(string username, string password);
        //bool ValidateCredentials(string username, string password, string role);
    }
}
