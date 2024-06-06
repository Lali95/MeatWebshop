using Microsoft.AspNetCore.Identity;

namespace Backend.Services.Authentication;

public interface ITokenService
{
    public string CreateToken(IdentityUser user);
}
