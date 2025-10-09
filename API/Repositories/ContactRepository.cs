using API.Models;
using API.Repositories.Interfaces;
using MongoDB.Driver;

namespace API.Repositories
{
    public class ContactRepository(IMongoDatabase database) : IContactRepository
    {
        private readonly IMongoCollection<Contact> contactCollection = database.GetCollection<Contact>("contacts");
        private readonly IMongoCollection<ContactData> contactDataCollection = database.GetCollection<ContactData>("contact_datas");

        public async Task Delete(string contactId)
        {
            var contact = await contactCollection.FindOneAndDeleteAsync(contact => contact.Id == contactId);
            if (contact != null)
                await contactDataCollection.DeleteOneAsync(cdata => cdata.ContactId == contact.Id);           
        }

        public async Task<Contact?> Get(string userId, string contactId, bool withData)
        {
            var contact = await contactCollection
                .Find(c => c.UserId == userId && c.Id == contactId)
                .FirstOrDefaultAsync();

            if (contact == null)
                return null;

            if (withData)
            {
                var data = await contactDataCollection
                    .Find(data => data.ContactId == contact.Id)
                    .FirstOrDefaultAsync();

                contact.Data = data ?? new ContactData { ContactId = contact.Id };
            }

            return contact;
        }

        public async Task<List<Contact>> List(string userId)
        {
            return await contactCollection
                .Find(c => c.UserId == userId)
                .ToListAsync();
        }

        public async Task Create(Contact contact)
        {
            await contactCollection.InsertOneAsync(contact);

            contact.Data ??= new ContactData { ContactId = contact.Id };
            await contactDataCollection.InsertOneAsync(contact.Data);
        }

        public async Task Update(Contact contact)
        {
            await contactCollection.ReplaceOneAsync(c => c.Id == contact.Id, contact);

            if (contact.Data != null)
                await contactDataCollection.ReplaceOneAsync(data => data.ContactId == contact.Id, contact.Data);
        }
    }
}
