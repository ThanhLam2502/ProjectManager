using Microsoft.AspNetCore.Mvc;
using ProjectManager.Entities.Services;
using ProjectManager.Entities.ViewModels;
using System.Threading.Tasks;

namespace ProjectManager.APIs.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TaskController : BaseApiController
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // POST api/tasks
        [HttpPost]
        public async Task<IActionResult> InsertListTask([FromBody] ListTaskViewModel model)
        {
            var response = await _taskService.InsertListTask(model);
            return StatusCode(response);
        }
        // PUT api/tasks/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateListTask([FromBody] ListTaskViewModel model, int id)
        {
            var response = await _taskService.UpdateListTask(model, id);
            return StatusCode(response);
        }
        // DELETE api/tasks/3
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteListTask(int id)
        {
            var response = await _taskService.DeleteListTask(id);
            return StatusCode(response);
        }

        // POST api/tasks/task
        [HttpPost("task")]
        public async Task<IActionResult> InsertTask([FromBody] TaskViewModel model)
        {
            var response = await _taskService.InsertTask(model);
            return StatusCode(response);
        }

        // PUT api/tasks/task/2
        [HttpPut("task/{id:int}")]
        public async Task<IActionResult> UpdateTask([FromBody] TaskViewModel model, int id)
        {
            var response = await _taskService.UpdateTask(model, id);
            return StatusCode(response);
        }
        // DELETE api/tasks/task/2
        [HttpDelete("task/{id:int}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var response = await _taskService.DeleteTask(id);
            return StatusCode(response);
        }

    }
}