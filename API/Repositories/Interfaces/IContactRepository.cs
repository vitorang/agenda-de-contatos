using API.Models;

namespace API.Repositories.Interfaces
{
    public interface IContactRepository
    {
        public Task Save(Contact contact);

        public Task Delete(string ContactId);

        public Task<Contact> Get(string ContactId);

        public Task<List<Contact>> List();
    }
}
