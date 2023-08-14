using DatingApp.API.Entities;

namespace DatingApp.API.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(AppUser user);
    }
}
