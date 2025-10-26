using API.Models;

namespace API.Services.Interfaces
{
    public interface IContactService
    {
        public Task Save(Contact contact);

        public Task Delete(string contactId);

        public Task<Contact> Get(string contactId);

        public Task<List<Contact>> List();
    }
}
