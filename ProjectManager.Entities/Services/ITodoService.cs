using ProjectManager.Core.Http;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectManager.Entities.Services
{
    public interface ITodoService : IBaseService<TodoItem>
    {
        Task<BaseResult<int>> InsertTodo(TodoViewModel model);
        Task<BaseResult<int>> UpdateTodo(TodoViewModel model, int id);
        Task<BaseResult<int>> DeleteTodo(int id);

        Task<BaseResult<List<ListTodoViewModel>>> GetTodosByTaskID(int taskId);
        Task<BaseResult<int>> InsertListTodo(ListTodoViewModel model);
        Task<BaseResult<int>> UpdateListTodo(ListTodoViewModel model, int id);
        Task<BaseResult<int>> DeleteListTodo(int id);
    }
}
