using ProjectManager.Core.Http;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectManager.Entities.Services
{
    public interface IUserService : IBaseService<User>
    {
        Task<BaseResult<List<UserViewModel>>> GetAllUsers();
    }
}
