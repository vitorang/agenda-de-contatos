namespace API.Models
{
    public class User
    {
        required public string Id { get; set; }

        required public string Username { get; set; }

        required public string PasswordHash { get; set; }

        required public int Salt { get; set; }
    }
}
