namespace Backend.Contracts
{
    public class UpBalanceRequest
    {
        public string Email { get; set; }
        public decimal Balance { get; set; } // Ensure this is a decimal
    }
}