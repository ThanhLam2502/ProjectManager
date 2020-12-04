using ProjectManager.Entities.Models;
using ProjectManager.Entities.Repositories;
using ProjectManager.Entities.ViewModels;
using System.Linq;

namespace ProjectManager.Repositories.Repostitory
{
    public static class TodosRepository
    {
        public static IQueryable<ListTodoViewModel> GetTodosByTaskID(this IRepository<TaskTodo> repository, int taskId)
        {
            var query = repository.Entities
                .Where(todos => todos.TaskId == taskId && todos.IsDeleted != true)
                .Select(todos => new ListTodoViewModel
                {
                    Id = todos.Id,
                    Name = todos.Name,
                    TaskId = todos.TaskId,
                    Todo = todos.TodoItem
                    .Select(todo => new TodoViewModel
                    {
                        Id = todo.Id,
                        Name = todo.Name,
                        IsComplete = todo.IsComplete,
                        ListTodoId = todo.ListTodoId,
                    })
                });

            return query;
        }
    }
}
