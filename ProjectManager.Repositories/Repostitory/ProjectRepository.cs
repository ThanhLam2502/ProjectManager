using ProjectManager.Entities.Models;
using ProjectManager.Entities.Repositories;
using ProjectManager.Entities.ViewModels;
using System.Linq;

namespace ProjectManager.Repositories.Repostitory
{
    public static class ProjectRepository
    {
        public static IQueryable<ProjectTaskViewModel> GetProjects(this IRepository<Project> repository)
        {
            return repository.Entities
                .Where(project => project.IsDeleted != true)
                .Select(project => new ProjectTaskViewModel
                {
                    Id = project.Id,
                    Name = project.Name,
                    StartDate = project.StartDate,
                    EndDate = project.EndDate,
                    Status = project.Status,
                    AssignTo = project.AssignTo,
                    Tasks = project.TaskProject
                    .Where(lstask => lstask.IsDeleted != true)
                    .Select(lstask => new ListTaskViewModel
                    {
                        Id = lstask.Id,
                        Name = lstask.Name,
                        ProjectId = lstask.ProjectId,
                        Task = lstask.TaskItem
                        .Where(task => task.IsDeleted != true)
                        .Select(task => new TaskViewModel
                        {
                            Id = task.Id,
                            Name = task.Name,
                            Description = task.Description,
                            AttachFiles = task.AttachFiles,
                            Status = task.Status,
                            ListTaskId = task.ListTaskId,
                        })
                    })
                });
        }
    }
}
