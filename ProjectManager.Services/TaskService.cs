using AutoMapper;
using ProjectManager.Core.Http;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.Repositories;
using ProjectManager.Entities.Resources;
using ProjectManager.Entities.Services;
using ProjectManager.Entities.UnitOfWork;
using ProjectManager.Entities.ViewModels;
using ProjectManager.Repositories.Repostitory;
using System.Threading.Tasks;

namespace ProjectManager.Services
{
    public class TaskService : BaseService<TaskItem>, ITaskService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<TaskProject> _reposProjectTask;
        private readonly IRepository<Comment> _reposComment;
        private readonly IRepository<TodoTask> _reposTodos;
        private readonly IRepository<User> _reposUsers;

        public TaskService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _reposProjectTask = _unitOfWork.Repository<TaskProject>();
            _reposTodos = _unitOfWork.Repository<TodoTask>();
            _reposComment = _unitOfWork.Repository<Comment>();
            _reposUsers = _unitOfWork.Repository<User>();
        }


        public async Task<BaseResult<TaskViewModel>> GetTaskDetailByID(int taskId)
        {
            var task = await Repository.FindAsync(taskId);

            if (task == null)
                return BaseResult<TaskViewModel>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            var taskViewModel = _mapper.Map<TaskViewModel>(task);

            taskViewModel.Comments = _reposComment.GetCommentByTaskID(taskViewModel.Id);
            taskViewModel.Todos = _reposTodos.GetTodosByTaskID(taskViewModel.Id);
            taskViewModel.Members = _reposUsers.GetUsersByTaskId(taskViewModel.Id);

            return BaseResult<TaskViewModel>.OK(taskViewModel);
        }


        public async Task<BaseResult<int>> InsertTaskItem(TaskViewModel model)
        {
            var task = _mapper.Map<TaskItem>(model);
            await Repository.InsertAsync(task);
            return BaseResult<int>.OK(task.Id, Messages.ItemInserted);
        }

        public async Task<BaseResult<int>> UpdateTaskItem(TaskViewModel model, int id)
        {
            var task = await Repository.FindAsync(id);
            if (task == null)
                return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            task.Name = model.Name;
            task.Description = model.Description;
            task.AttachFiles = model.AttachFiles;
            task.Status = model.Status;
            task.ListTaskId = model.ListTaskId;

            int saved = await _unitOfWork.SaveChangesAsync();

            // Change or no change
            if (saved >= 0)
                return BaseResult<int>.OK(task.Id, Messages.ItemUpdated);

            return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);
        }

        public async Task<BaseResult<int>> DeleteTaskItem(int id)
        {
            var task = await Repository.FindAsync(id);
            if (task == null)
                return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            task.IsDeleted = true;

            var saved = await _unitOfWork.SaveChangesAsync();
            if (saved > 0)
                return BaseResult<int>.OK(id, Messages.ItemDeleted);

            return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);
        }



        public async Task<BaseResult<int>> InsertBoard(ListTaskViewModel model)
        {
            var listTask = _mapper.Map<TaskProject>(model);

            await _reposProjectTask.InsertAsync(listTask);

            return BaseResult<int>.OK(listTask.Id, Messages.ItemInserted);
        }

        public async Task<BaseResult<int>> UpdateBoard(ListTaskViewModel model, int id)
        {
            var listTask = await _reposProjectTask.FindAsync(id);
            if (listTask == null)
                return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            listTask.Name = model.Name;
            listTask.ProjectId = model.ProjectId;
            int saved = await _unitOfWork.SaveChangesAsync();

            if (saved > 0)
                return BaseResult<int>.OK(listTask.Id, Messages.ItemUpdated);

            return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);
        }

        public async Task<BaseResult<int>> DeleteBoard(int id)
        {
            var listTask = await _reposProjectTask.FindAsync(id);
            if (listTask == null)
                return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            listTask.IsDeleted = true;
            var saved = await _unitOfWork.SaveChangesAsync();
            if (saved > 0)
                return BaseResult<int>.OK(id, Messages.ItemDeleted);

            return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);
        }

    }
}
