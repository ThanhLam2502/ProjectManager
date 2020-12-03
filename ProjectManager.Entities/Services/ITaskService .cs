using ProjectManager.Core.Http;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.ViewModels;
using System.Threading.Tasks;

namespace ProjectManager.Entities.Services
{
    public interface ITaskService : IBaseService<TaskProject>
    {
        Task<HttpResponse<int>> InsertTask(TaskViewModel model);
        Task<HttpResponse<int>> UpdateTask(TaskViewModel model, int id);
        Task<HttpResponse<int>> DeleteTask(int id);
        Task<HttpResponse<int>> InsertListTask(ListTaskViewModel model);
        Task<HttpResponse<int>> UpdateListTask(ListTaskViewModel model, int id);
        Task<HttpResponse<int>> DeleteListTask(int id);
    }
}
