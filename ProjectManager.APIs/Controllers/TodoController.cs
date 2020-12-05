using Microsoft.AspNetCore.Mvc;
using ProjectManager.Entities.Services;
using ProjectManager.Entities.ViewModels;
using System.Threading.Tasks;

namespace ProjectManager.APIs.Controllers
{
    [Route("api/todos")]
    [ApiController]
    public class TodoController : BaseApiController
    {
        private readonly ITodoService _todoService;

        public TodoController(ITodoService todoService)
        {
            _todoService = todoService;
        }
        
        [HttpPost]
        public async Task<IActionResult> InsertChecklistTodo([FromBody] ListTodoViewModel model)
        {
            var response = await _todoService.InsertChecklistTodo(model);
            return StatusCode(response);
        }

        [HttpPut("{checklistId:int}")]
        public async Task<IActionResult> UpdateChecklistTodo([FromBody] ListTodoViewModel model,[FromRoute] int checklistId)
        {
            var response = await _todoService.UpdateChecklistTodo(model, checklistId);
            return StatusCode(response);
        }

        [HttpDelete("{checklistId:int}")]
        public async Task<IActionResult> DeleteChecklistTodo([FromRoute]int checklistId)
        {
            var response = await _todoService.DeleteChecklistTodo(checklistId);
            return StatusCode(response);
        }

        // POST api/todos/todo-item
        [HttpPost("todo-item")]
        public async Task<IActionResult> InsertTodoItem([FromBody] TodoViewModel model)
        {
            var response = await _todoService.InsertTodoItem(model);
            return StatusCode(response);
        }

        [HttpPut("todo-item/{todoId:int}")]
        public async Task<IActionResult> UpdateTodoItem([FromBody] TodoViewModel model,[FromRoute] int todoId)
        {
            var response = await _todoService.UpdateTodoItem(model, todoId);
            return StatusCode(response);
        }

        [HttpDelete("todo-item/{todoId:int}")]
        public async Task<IActionResult> DeleteTodoItem([FromRoute] int todoId)
        {
            var response = await _todoService.DeleteTodoItem(todoId);
            return StatusCode(response);
        }

    }
}