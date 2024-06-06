using Microsoft.AspNetCore.Identity;

namespace Backend.Services.Authentication;


public class AuthenticationSeeder
{

    private RoleManager<IdentityRole> roleManager;

    public AuthenticationSeeder(RoleManager<IdentityRole> roleManager)
    {
        this.roleManager = roleManager;
    }

}
