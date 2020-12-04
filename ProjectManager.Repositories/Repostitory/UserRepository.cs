using ProjectManager.Entities.Models;
using ProjectManager.Entities.Repositories;
using ProjectManager.Entities.ViewModels;
using System.Linq;

namespace ProjectManager.Repositories.Repostitory
{
    public static class UserRepository
    {
        public static IQueryable<UserViewModel> GetAllUsers(this IRepository<User> repository)
        {
            return repository.Entities
               .Select(user => new UserViewModel
               {
                   Id = user.Id,
                   Name = user.Name,
                   Img = user.Img,
               });
        }
        public static  IQueryable<UserViewModel> GetUsersByTaskId(this IRepository<User> repository, int taskId)
        {
            return repository.Entities
               .SelectMany(t => t.TaskUser)
               .Where(tu => tu.TaskId == taskId)
               .Select(tu => new UserViewModel
               {
                   Id = tu.User.Id,
                   Name = tu.User.Name,
                   Img = tu.User.Img,
               });
        }
    }
}
