using ProjectManager.Core.Http;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectManager.Entities.Services
{
    public interface ITaskService : IBaseService<TaskItem>
    {
        Task<BaseResult<TaskViewModel>> GetTaskDetailByID(int taskId);
        Task<BaseResult<int>> InsertTaskItem(TaskViewModel model);
        Task<BaseResult<int>> UpdateTaskItem(TaskViewModel model, int id);
        Task<BaseResult<int>> DeleteTaskItem(int id);
        Task<BaseResult<int>> InsertBoard(ListTaskViewModel model);
        Task<BaseResult<int>> UpdateBoard(ListTaskViewModel model, int id);
        Task<BaseResult<int>> DeleteBoard(int id);
    }
}
