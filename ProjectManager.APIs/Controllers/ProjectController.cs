﻿using Microsoft.AspNetCore.Mvc;
using ProjectManager.Entities.Services;
using ProjectManager.Entities.ViewModels;
using System.Threading.Tasks;

namespace ProjectManager.APIs.Controllers
{
    [Route("api/projects")]
    [ApiController]
    public class ProjectController : BaseApiController
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        // GET: api/projects
        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            var response = await _projectService.GetProjects();
            return StatusCode(response);
        }

        [HttpPost]
        public async Task<IActionResult> InsertProject([FromBody] ProjectTaskViewModel model)
        {
            var response = await _projectService.InsertProject(model);
            return StatusCode(response);
        }


        [HttpPut]
        public async Task<IActionResult> UpdateProject([FromBody] ProjectTaskViewModel model)
        {
            var response = await _projectService.UpdateProject(model);
            return StatusCode(response);
        }

        // DELETE api/projects/5
        [HttpDelete("{projectID:int}")]
        public async Task<IActionResult> DeleteProject([FromRoute]int projectID)
        {
            var response = await _projectService.DeleteProject(projectID);
            return StatusCode(response);
        }

    }

}