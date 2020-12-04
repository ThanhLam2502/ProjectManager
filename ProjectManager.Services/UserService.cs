using Microsoft.EntityFrameworkCore;
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

        public async Task<BaseResult<List<UserViewModel>>> GetAllUsers()
        {
            var users = await Repository.GetAllUsers().ToListAsync();
            return BaseResult<List<UserViewModel>>.OK(users);
        }
    }
}
