using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace API.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        required public string Username { get; set; }

        required public string PasswordHash { get; set; }

        required public int Salt { get; set; }
    }
}
