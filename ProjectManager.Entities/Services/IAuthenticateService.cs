using ProjectManager.Entities.Models.Extensions;
using System.Threading.Tasks;

namespace ProjectManager.Entities.Services
{
    public interface IAuthenticateService
    {
        Task<AuthenticatedModel> GetUser(string identityName);
    }
}
