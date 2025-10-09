using API.Models;

namespace API.Repositories.Interfaces
{
    public interface IContactRepository
    {
        public Task Create(Contact contact);

        public Task Update(Contact contact);

        public Task Delete(string contactId);

        public Task<Contact?> Get(string userId, string contactId, bool withData = false);

        public Task<List<Contact>> List(string userId);
    }
}
