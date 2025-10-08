namespace API.Models
{
    public class Contact
    {
        required public string Id { get; set; }

        required public string UserId { get; set; }

        required public string Name { get; set; }

        public ContactData? Data { get; set; }
    }
}
