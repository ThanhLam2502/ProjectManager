using AutoMapper;
using ProjectManager.Core.Http;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.Resources;
using ProjectManager.Entities.Services;
using ProjectManager.Entities.UnitOfWork;
using ProjectManager.Entities.ViewModels;
using ProjectManager.Repositories.Repostitory;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectManager.Services
{
    public class TodoService : BaseService<Todo>, ITodoService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public TodoService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<HttpResponse<int>> InsertTodo(TodoViewModel model)
        {
            var todo = _mapper.Map<Todo>(model);
            await Repository.InsertAsync(todo);
            return HttpResponse<int>.OK(todo.Id, Messages.ItemInserted);
        }

        public async Task<HttpResponse<int>> UpdateTodo(TodoViewModel model, int id)
        {
            var todo = await Repository.FindAsync(id);
            if (todo == null)
                return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            todo.Name = model.Name;
            todo.IsComplete = model.IsComplete;
            todo.ListTodoId = model.ListTodoId;
            int saved = await _unitOfWork.SaveChangesAsync();
            if (saved > 0)
                return HttpResponse<int>.OK(todo.Id, Messages.ItemUpdated);

            return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);

        }

        public async Task<HttpResponse<int>> DeleteTodo(int id)
        {
            var todo = await Repository.FindAsync(id);
            if (todo == null)
                return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            todo.IsDeleted = true;
            var saved = await _unitOfWork.SaveChangesAsync();
            if (saved > 0)
                return HttpResponse<int>.OK(id, Messages.ItemDeleted);

            return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);
        }


        public Task<HttpResponse<List<ListTodoViewModel>>> GetTodosByTaskID(int taskId)
        {
            var repos = _unitOfWork.Repository<ListTodo>();
            var todos = repos.GetTodosByTaskID(taskId);
            return todos;

        }
        public async Task<HttpResponse<int>> InsertListTodo(ListTodoViewModel model)
        {
            var repos = _unitOfWork.Repository<ListTodo>();
            var listTodo = _mapper.Map<ListTodo>(model);
            await repos.InsertAsync(listTodo);
            return HttpResponse<int>.OK(listTodo.Id, Messages.ItemInserted);
        }

        public async Task<HttpResponse<int>> UpdateListTodo(ListTodoViewModel model, int id)
        {
            var repos = _unitOfWork.Repository<ListTodo>();
            var listTodo = await repos.FindAsync(id);

            if (listTodo == null)
                return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            listTodo.Name = model.Name;
            listTodo.TaskId = model.TaskId;

            int saved = await _unitOfWork.SaveChangesAsync();
            if (saved > 0)
                return HttpResponse<int>.OK(listTodo.Id, Messages.ItemUpdated);

            return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);

        }

        public async Task<HttpResponse<int>> DeleteListTodo(int id)
        {
            var repos = _unitOfWork.Repository<ListTodo>();
            var listTodo = await repos.FindAsync(id);
            if (listTodo == null)
                return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            listTodo.IsDeleted = true;
            var saved = await _unitOfWork.SaveChangesAsync();
            if (saved > 0)
                return HttpResponse<int>.OK(id, Messages.ItemDeleted);

            return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);
        }

    }
}
