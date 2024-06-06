using Backend.Model;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services.Authentication;

public interface ITokenService
{
    string CreateToken(ApplicationUser user, string role);
}