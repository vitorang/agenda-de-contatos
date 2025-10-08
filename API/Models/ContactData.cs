namespace API.Models
{
    public class ContactData
    {
        required public string Id { get; set; }

        required public string ContactId { get; set; }

        required public List<string> PhoneNumbers { get; set; }

        required public List<string> Emails { get; set; }

        required public List<ContactAddresses> Addresses { get; set; }
    }

    public class ContactAddresses
    {
        required public string PostalCode { get; set; }

        required public string State { get; set; }

        required public string City { get; set; }

        required public string Neighborhood { get; set; }

        required public string Street { get; set; }

        required public string Number { get; set; }

        required public string Complement { get; set; }
    }
}
