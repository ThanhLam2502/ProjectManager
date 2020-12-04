using ProjectManager.Core.Http;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectManager.Entities.Services
{
    public interface IProjectService : IBaseService<Project>
    {
        Task<BaseResult<List<ProjectTaskViewModel>>> GetProjects();
        Task<BaseResult<int>> InsertProject(ProjectTaskViewModel model);
        Task<BaseResult<int>> UpdateProject(ProjectTaskViewModel model);
        Task<BaseResult<int>> DeleteProject(int projectID);
    }
}
