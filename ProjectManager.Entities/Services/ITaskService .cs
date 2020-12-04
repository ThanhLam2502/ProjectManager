using ProjectManager.Core.Http;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectManager.Entities.Services
{
    public interface ITaskService : IBaseService<TaskItem>
    {
        Task<BaseResult<TaskViewModel>> GetTaskByID(int taskId);
        Task<BaseResult<int>> InsertTaskItem(TaskViewModel model);
        Task<BaseResult<int>> UpdateTaskItem(TaskViewModel model, int id);
        Task<BaseResult<int>> DeleteTaskItem(int id);
        Task<BaseResult<int>> InsertTasks(ListTaskViewModel model);
        Task<BaseResult<int>> UpdateTasks(ListTaskViewModel model, int id);
        Task<BaseResult<int>> DeleteTasks(int id);
    }
}
