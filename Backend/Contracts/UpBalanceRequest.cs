namespace Backend.Contracts;

public record UpBalanceRequest(
    string Email,
    decimal Balance);