using ProjectManager.Core.Http;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectManager.Entities.Services
{
    public interface ITodoService : IBaseService<Todo>
    {
        Task<HttpResponse<int>> InsertTodo(TodoViewModel model);
        Task<HttpResponse<int>> UpdateTodo(TodoViewModel model, int id);
        Task<HttpResponse<int>> DeleteTodo(int id);

        Task<HttpResponse<List<ListTodoViewModel>>> GetTodosByTaskID(int taskId);
        Task<HttpResponse<int>> InsertListTodo(ListTodoViewModel model);
        Task<HttpResponse<int>> UpdateListTodo(ListTodoViewModel model, int id);
        Task<HttpResponse<int>> DeleteListTodo(int id);
    }
}
