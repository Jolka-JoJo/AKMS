using AutoMapper;
using LanguageAppBackEnd.Entities;
using LanguageAppBackEnd.Models;

namespace LanguageAppBackEnd
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<UserForRegistrationDTO, User>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.Email));
        }
    }
}
