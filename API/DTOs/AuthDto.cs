namespace API.DTOs
{
    public class AuthDto
    {
        required public string Token { get; set; }

        required public int ExpiryMinutes { get; set; }
    }
}
