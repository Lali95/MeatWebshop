namespace Backend.Contracts
{
    public record ActivationResponse(
        string UserName,
        string Message = "Account successfully activated."
    );
}