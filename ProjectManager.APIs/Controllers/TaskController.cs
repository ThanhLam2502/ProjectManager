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

        
        [HttpPost]
        public async Task<IActionResult> InsertTasks([FromBody] ListTaskViewModel model)
        {
            var response = await _taskService.InsertTasks(model);
            return StatusCode(response);
        }
      
        [HttpPut("{listId:int}")]
        public async Task<IActionResult> UpdateTasks([FromBody] ListTaskViewModel model, [FromRoute] int listId)
        {
            var response = await _taskService.UpdateTasks(model, listId);
            return StatusCode(response);
        }
   
        [HttpDelete("{listId:int}")]
        public async Task<IActionResult> DeleteTasks([FromRoute] int listId)
        {
            var response = await _taskService.DeleteTasks(listId);
            return StatusCode(response);
        }

        [HttpGet("task_item/{taskId:int}")]
        public async Task<IActionResult> GetTaskByID([FromRoute] int taskId)
        {
            var response = await _taskService.GetTaskByID(taskId);
            return StatusCode(response);
        }


        [HttpPost("task_item")]
        public async Task<IActionResult> InsertTaskItem([FromBody] TaskViewModel model)
        {
            var response = await _taskService.InsertTaskItem(model);
            return StatusCode(response);
        }

       
        [HttpPut("task_item/{taskId:int}")]
        public async Task<IActionResult> UpdateTaskItem([FromBody] TaskViewModel model, [FromRoute] int taskId)
        {
            var response = await _taskService.UpdateTaskItem(model, taskId);
            return StatusCode(response);
        }

       
        [HttpDelete("task_item/{taskId:int}")]
        public async Task<IActionResult> DeleteTaskItem([FromRoute] int taskId)
        {
            var response = await _taskService.DeleteTaskItem(taskId);
            return StatusCode(response);
        }

    }
}