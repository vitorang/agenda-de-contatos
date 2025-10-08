using API.Models;

namespace API.DTOs
{
    public class ContactDto
    {
        required public string Id { get; set; }

        required public string Name { get; set; }

        required public List<string> PhoneNumbers { get; set; }

        required public List<string> Emails { get; set; }

        required public List<ContactAddresses> Addresses { get; set; }
    }
}
