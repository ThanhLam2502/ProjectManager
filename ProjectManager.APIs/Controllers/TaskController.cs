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
        public async Task<IActionResult> InsertBoard([FromBody] ListTaskViewModel model)
        {
            var response = await _taskService.InsertBoard(model);
            return StatusCode(response);
        }
      
        [HttpPut("{boardId:int}")]
        public async Task<IActionResult> UpdateBoard([FromBody] ListTaskViewModel model, [FromRoute] int boardId)
        {
            var response = await _taskService.UpdateBoard(model, boardId);
            return StatusCode(response);
        }
   
        [HttpDelete("{boardId:int}")]
        public async Task<IActionResult> DeleteBoard([FromRoute] int boardId)
        {
            var response = await _taskService.DeleteBoard(boardId);
            return StatusCode(response);
        }

        [HttpGet("task-item/{taskId:int}")]
        public async Task<IActionResult> GetTaskDetailByID([FromRoute] int taskId)
        {
            var response = await _taskService.GetTaskDetailByID(taskId);
            return StatusCode(response);
        }


        [HttpPost("task-item")]
        public async Task<IActionResult> InsertTaskItem([FromBody] TaskViewModel model)
        {
            var response = await _taskService.InsertTaskItem(model);
            return StatusCode(response);
        }

       
        [HttpPut("task-item/{taskId:int}")]
        public async Task<IActionResult> UpdateTaskItem([FromBody] TaskViewModel model, [FromRoute] int taskId)
        {
            var response = await _taskService.UpdateTaskItem(model, taskId);
            return StatusCode(response);
        }

       
        [HttpDelete("task-item/{taskId:int}")]
        public async Task<IActionResult> DeleteTaskItem([FromRoute] int taskId)
        {
            var response = await _taskService.DeleteTaskItem(taskId);
            return StatusCode(response);
        }

    }
}