namespace API.Models.ProgramSettings
{
    public class JwtSettings
    {
        required public string Key { get; set; }

        required public string Issuer { get; set; }

        required public string Audience { get; set; }

        required public int ExpiryMinutes { get; set; }
    }
}
