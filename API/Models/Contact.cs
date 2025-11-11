using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Models
{
    public class Contact
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonRepresentation(BsonType.ObjectId)]
        required public string UserId { get; set; }

        required public string Name { get; set; }

        [BsonIgnore]
        public ContactData? Data { get; set; }

        public void SetIds(Contact? contact)
        {
            if (contact == null)
                return;

            Id = contact.Id;

            if (Data != null && contact.Data != null)
            {
                Data.Id = contact.Data.Id;
                Data.ContactId = contact.Id;
            }
        }
    }
}
