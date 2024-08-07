namespace Backend.Services.Authentication;



public interface IAuthService
{
    Task<AuthResult> RegisterAsync(string email, string userName, string password, DateTime birthDate, string address, string role);
    Task<AuthResult> LoginAsync(string userName, string password);
    Task<AuthResult> DeactivateAsync(string email, string password);
    Task<AuthResult> ActivateAsync(string email, string password);
}