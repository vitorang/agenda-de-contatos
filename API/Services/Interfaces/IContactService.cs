using API.Models;

namespace API.Services.Interfaces
{
    public interface IContactService
    {
        public Task<Contact> Save(Contact contact);

        public Task Delete(Contact contact);

        public Task<Contact> Get(Contact contact);

        public Task<List<Contact>> List();
    }
}
