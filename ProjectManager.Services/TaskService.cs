using AutoMapper;
using ProjectManager.Core.Http;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.Resources;
using ProjectManager.Entities.Services;
using ProjectManager.Entities.UnitOfWork;
using ProjectManager.Entities.ViewModels;
using System.Threading.Tasks;

namespace ProjectManager.Services
{
    public class TaskService : BaseService<TaskProject>, ITaskService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public TaskService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<HttpResponse<int>> InsertTask(TaskViewModel model)
        {
            var task = _mapper.Map<TaskProject>(model);
            await Repository.InsertAsync(task);
            return HttpResponse<int>.OK(task.Id, Messages.ItemInserted);
        }

        public async Task<HttpResponse<int>> UpdateTask(TaskViewModel model, int id)
        {
            var task = await Repository.FindAsync(id);
            if (task == null)
                return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            task.Name = model.Name;
            task.Description = model.Description;
            task.AttachFiles = model.AttachFiles;
            task.Status = model.Status;
            task.ListTaskId = model.ListTaskId;

            int saved = await _unitOfWork.SaveChangesAsync();

            if (saved >= 0)
                return HttpResponse<int>.OK(task.Id, Messages.ItemUpdated);

            return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);
        }

        public async Task<HttpResponse<int>> DeleteTask(int id)
        {
            var task = await Repository.FindAsync(id);
            if (task == null)
                return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            task.IsDeleted = true;
            var saved = await _unitOfWork.SaveChangesAsync();
            if (saved > 0)
                return HttpResponse<int>.OK(id, Messages.ItemDeleted);

            return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);
        }

        public async Task<HttpResponse<int>> InsertListTask(ListTaskViewModel model)
        {
            var repos = _unitOfWork.Repository<ListTask>();
            var listTask = _mapper.Map<ListTask>(model);
            await repos.InsertAsync(listTask);
            return HttpResponse<int>.OK(listTask.Id, Messages.ItemInserted);
        }

        public async Task<HttpResponse<int>> UpdateListTask(ListTaskViewModel model, int id)
        {
            var repos = _unitOfWork.Repository<ListTask>();
            var listTask = await repos.FindAsync(id);
            if (listTask == null)
                return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            listTask.Name = model.Name;
            listTask.ProjectId = model.ProjectId;
            int saved = await _unitOfWork.SaveChangesAsync();

            if (saved > 0)
                return HttpResponse<int>.OK(listTask.Id, Messages.ItemUpdated);

            return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);
        }

        public async Task<HttpResponse<int>> DeleteListTask(int id) //aaa
        {
            var repos = _unitOfWork.Repository<ListTask>();
            var listTask = await repos.FindAsync(id);
            if (listTask == null)
                return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            listTask.IsDeleted = true;
            var saved = await _unitOfWork.SaveChangesAsync();
            if (saved > 0)
                return HttpResponse<int>.OK(id, Messages.ItemDeleted);

            return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);
        }
    }
}
