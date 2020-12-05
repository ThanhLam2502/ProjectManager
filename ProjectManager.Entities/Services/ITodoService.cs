using ProjectManager.Core.Http;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectManager.Entities.Services
{
    public interface ITodoService : IBaseService<TodoItem>
    {
        Task<BaseResult<int>> InsertTodoItem(TodoViewModel model);
        Task<BaseResult<int>> UpdateTodoItem(TodoViewModel model, int id);
        Task<BaseResult<int>> DeleteTodoItem(int id);

        Task<BaseResult<int>> InsertChecklistTodo(ListTodoViewModel model);
        Task<BaseResult<int>> UpdateChecklistTodo(ListTodoViewModel model, int id);
        Task<BaseResult<int>> DeleteChecklistTodo(int id);
    }
}
