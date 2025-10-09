using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Models
{
    public class Contact
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        required public string Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        required public string UserId { get; set; }

        required public string Name { get; set; }

        [BsonIgnore]
        public ContactData? Data { get; set; }
    }
}
