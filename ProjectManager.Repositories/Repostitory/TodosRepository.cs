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
    public static class TodosRepository
    {
        public static async Task<HttpResponse<List<ListTodoViewModel>>> GetTodosByTaskID(this IRepository<ListTodo> repository, int taskId)
        {
            var query = await repository.Entities
                .Where(todos => todos.TaskId == taskId && todos.IsDeleted != true)
                .Select(todos => new ListTodoViewModel
                {
                    Id = todos.Id,
                    Name = todos.Name,
                    TaskId = todos.TaskId,
                    Todo = todos.Todo
                    .Select(todo => new TodoViewModel
                    {
                        Id = todo.Id,
                        Name = todo.Name,
                        IsComplete = todo.IsComplete,
                        ListTodoId = todo.ListTodoId,
                    })
                }).ToListAsync();

            return HttpResponse<List<ListTodoViewModel>>.OK(query);
        }
    }
}
