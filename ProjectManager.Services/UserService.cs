using ProjectManager.Core.Http;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.Services;
using ProjectManager.Entities.UnitOfWork;
using ProjectManager.Entities.ViewModels;
using ProjectManager.Repositories.Repostitory;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectManager.Services
{
    public class UserService : BaseService<User>, IUserService
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork): base(unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<HttpResponse<List<UserViewModel>>> GetAllUsers()
        {
            var users = await Repository.GetAllUsers();
            return users;
        }
        public async Task<HttpResponse<List<UserViewModel>>> GetUsersByTaskId(int taskId)
        {
            var repos = _unitOfWork.Repository<TaskProject>();
            var users = await repos.GetUsersByTaskId(taskId);
            return users;
        }
    }
}
