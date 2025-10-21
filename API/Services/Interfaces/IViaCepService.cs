using API.Models;

namespace API.Services.Interfaces
{
    public interface IViaCepService
    {
        public Task<ContactAddress> Search(string postalCode);
    }
}
