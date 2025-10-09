using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Models
{
    public class ContactData
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonRepresentation(BsonType.ObjectId)]
        required public string ContactId { get; set; }

        public List<string> PhoneNumbers { get; set; } = [];

        public List<string> Emails { get; set; } = [];

        public List<ContactAddresses> Addresses { get; set; } = [];
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
