using ProjectManager.Core.Http;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectManager.Entities.Services
{
    public interface IProjectService : IBaseService<Project>
    {
        Task<HttpResponse<List<ProjectTaskViewModel>>> GetProjects();
        Task<HttpResponse<int>> InsertProject(ProjectTaskViewModel model);
        Task<HttpResponse<int>> UpdateProject(ProjectTaskViewModel model);
        Task<HttpResponse<int>> DeleteProject(int id);
    }
}
