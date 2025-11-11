using API.Models;
using API.Repositories.Interfaces;
using MongoDB.Driver;

namespace API.Repositories
{
    public class ContactRepository(IMongoDatabase database, IClientSessionHandle session) : IContactRepository
    {
        private readonly IMongoCollection<Contact> contactCollection = database.GetCollection<Contact>("contacts");
        private readonly IMongoCollection<ContactData> contactDataCollection = database.GetCollection<ContactData>("contact_datas");

        public async Task Delete(string userId, string contactId)
        {
            await session.WithTransactionAsync(async (s, ct) =>
            {
                var contact = await contactCollection.FindOneAndDeleteAsync(contact => contact.Id == contactId && contact.UserId == userId, cancellationToken: ct);
                if (contact != null)
                    await contactDataCollection.DeleteOneAsync(cdata => cdata.ContactId == contact.Id, cancellationToken: ct);

                return Task.FromResult(true);
            });
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
            await session.WithTransactionAsync(async (s, ct) =>
            {
                await contactCollection.InsertOneAsync(contact, cancellationToken: ct);

                contact.Data ??= new ContactData { ContactId = contact.Id };
                await contactDataCollection.InsertOneAsync(contact.Data, cancellationToken: ct);

                return Task.FromResult(true);
            });
        }

        public async Task Update(Contact contact)
        {
            await session.WithTransactionAsync(async (s, ct) =>
            {
                await contactCollection.ReplaceOneAsync(c => c.Id == contact.Id, contact, cancellationToken: ct);

                if (contact.Data != null)
                {
                    var oldData = await contactDataCollection.Find(data => data.ContactId == contact.Id).FirstOrDefaultAsync(cancellationToken: ct);
                    if (oldData == null)
                        await contactDataCollection.InsertOneAsync(contact.Data, cancellationToken: ct);
                    else
                    {
                        contact.Data.Id = oldData.Id;
                        await contactDataCollection.ReplaceOneAsync(data => data.ContactId == contact.Id, contact.Data, cancellationToken: ct);
                    }
                }

                return Task.FromResult(true);
            });
        }
    }
}
