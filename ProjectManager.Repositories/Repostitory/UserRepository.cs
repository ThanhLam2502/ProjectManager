using Microsoft.EntityFrameworkCore;
using ProjectManager.Core.Http;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.Repositories;
using ProjectManager.Entities.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectManager.Repositories.Repostitory
{
    public static class UserRepository
    {
        public static async Task<HttpResponse<List<UserViewModel>>> GetAllUsers(this IRepository<User> repository)
        {
            var query = await repository.Entities
               .Select(user => new UserViewModel
               {
                   Id = user.Id,
                   Name = user.Name,
                   Img = user.Img,
               }).ToListAsync();

            return HttpResponse<List<UserViewModel>>.OK(query);
        }
        public static async Task<HttpResponse<List<UserViewModel>>> GetUsersByTaskId(this IRepository<TaskProject> repository, int taskId)
        {
            var query = await repository.Entities
               .SelectMany(t => t.TaskUser)
               .Where(tu => tu.TaskId == taskId)
               .Select(tu => new UserViewModel
               {
                   Id = tu.User.Id,
                   Name = tu.User.Name,
                   Img = tu.User.Img,
               }).ToListAsync();

            return HttpResponse<List<UserViewModel>>.OK(query);
        }
    }
}
