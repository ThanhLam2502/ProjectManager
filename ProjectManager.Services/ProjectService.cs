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
    public class ProjectService : BaseService<Project>, IProjectService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ProjectService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<HttpResponse<List<ProjectTaskViewModel>>> GetProjects()
        {
            var projects = await Repository.GetProjects().ToListAsync();
            return HttpResponse<List<ProjectTaskViewModel>>.OK(projects);
        }

        public async Task<HttpResponse<int>> InsertProject(ProjectTaskViewModel model)
        {
            var project = _mapper.Map<Project>(model);
            await Repository.InsertAsync(project);
            return HttpResponse<int>.OK(project.Id, Messages.ItemInserted);
        }

        public async Task<HttpResponse<int>> DeleteProject(int id)
        {
            var project = await Repository.FindAsync(id);
            if (project == null)
                return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            project.IsDeleted = true;
            var saved = await _unitOfWork.SaveChangesAsync();
            if (saved > 0)
                return HttpResponse<int>.OK(id, Messages.ItemDeleted);

            return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);

        }

        public async Task<HttpResponse<int>> UpdateProject(ProjectTaskViewModel model)
        {
            var project = await Repository.FindAsync(model.Id);
            if (project == null)
                return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            project.Name = model.Name;
            project.StartDate = model.StartDate;
            project.EndDate = model.EndDate;
            project.AssignTo = model.AssignTo;
            project.Status = model.Status;
            int saved = await _unitOfWork.SaveChangesAsync();

            if (saved > 0)
                return HttpResponse<int>.OK(project.Id, Messages.ItemUpdated);

            return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);
        }
    }
}