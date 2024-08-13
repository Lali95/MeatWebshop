namespace Backend.Contracts
{
    public class AuthResponse
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public decimal Balance { get; set; } // Balance as decimal
        public string Token { get; set; }
        public string Role { get; set; }

        // Constructor to include Balance and Token
        public AuthResponse(string email, string userName, decimal balance, string token, string role)
        {
            Email = email;
            UserName = userName;
            Balance = balance; // Ensure Balance is decimal
            Token = token;
            Role = role;
        }
    }
}