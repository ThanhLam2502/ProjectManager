using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
    public class TodoService : BaseService<TodoItem>, ITodoService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public TodoService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<BaseResult<int>> InsertTodo(TodoViewModel model)
        {
            var todo = _mapper.Map<TodoItem>(model);
            await Repository.InsertAsync(todo);
            return BaseResult<int>.OK(todo.Id, Messages.ItemInserted);
        }

        public async Task<BaseResult<int>> UpdateTodo(TodoViewModel model, int id)
        {
            var todo = await Repository.FindAsync(id);
            if (todo == null)
                return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            todo.Name = model.Name;
            todo.IsComplete = model.IsComplete;
            todo.ListTodoId = model.ListTodoId;
            int saved = await _unitOfWork.SaveChangesAsync();
            if (saved > 0)
                return BaseResult<int>.OK(todo.Id, Messages.ItemUpdated);

            return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);

        }

        public async Task<BaseResult<int>> DeleteTodo(int id)
        {
            var todo = await Repository.FindAsync(id);
            if (todo == null)
                return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            todo.IsDeleted = true;
            var saved = await _unitOfWork.SaveChangesAsync();
            if (saved > 0)
                return BaseResult<int>.OK(id, Messages.ItemDeleted);

            return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);
        }


        public async Task<BaseResult<List<ListTodoViewModel>>> GetTodosByTaskID(int taskId)
        {
            var repos = _unitOfWork.Repository<TaskTodo>();
            var todos = await repos.GetTodosByTaskID(taskId).ToListAsync();
            return BaseResult<List<ListTodoViewModel>>.OK(todos);

        }
        public async Task<BaseResult<int>> InsertListTodo(ListTodoViewModel model)
        {
            var repos = _unitOfWork.Repository<TaskTodo>();
            var listTodo = _mapper.Map<TaskTodo>(model);
            await repos.InsertAsync(listTodo);
            return BaseResult<int>.OK(listTodo.Id, Messages.ItemInserted);
        }

        public async Task<BaseResult<int>> UpdateListTodo(ListTodoViewModel model, int id)
        {
            var repos = _unitOfWork.Repository<TaskTodo>();
            var listTodo = await repos.FindAsync(id);

            if (listTodo == null)
                return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            listTodo.Name = model.Name;
            listTodo.TaskId = model.TaskId;

            int saved = await _unitOfWork.SaveChangesAsync();
            if (saved > 0)
                return BaseResult<int>.OK(listTodo.Id, Messages.ItemUpdated);

            return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);

        }

        public async Task<BaseResult<int>> DeleteListTodo(int id)
        {
            var repos = _unitOfWork.Repository<TaskTodo>();
            var listTodo = await repos.FindAsync(id);
            if (listTodo == null)
                return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            listTodo.IsDeleted = true;
            var saved = await _unitOfWork.SaveChangesAsync();
            if (saved > 0)
                return BaseResult<int>.OK(id, Messages.ItemDeleted);

            return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);
        }

    }
}
