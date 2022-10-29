namespace LanguageAppBackEnd.Entities
{
    public class RegistrationResponseDTO
    {
        public bool IsSuccessfulRegistration { get; set; }
        public IEnumerable<string>? Errors { get; set; }
    }
}
