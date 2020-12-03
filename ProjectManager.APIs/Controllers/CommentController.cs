using Microsoft.AspNetCore.Mvc;
using ProjectManager.Entities.Services;
using ProjectManager.Entities.ViewModels;
using System.Threading.Tasks;

namespace ProjectManager.APIs.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : BaseApiController
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        // GET: api/comments/0
        [HttpGet("task/{id:int}")]
        public async Task<IActionResult> GetCommentByTaskID([FromRoute]int id)    
        {
            var response = await _commentService.GetCommentByTaskID(id);
            return StatusCode(response);
        }     

        [HttpPost]
        public async Task<IActionResult> InsertComment([FromBody] CommentViewModel model)
        {
            var response = await _commentService.InsertComment(model);
            return StatusCode(response);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateCmtContent([FromBody] CommentViewModel model,[FromRoute] int id)
        {
            var response = await _commentService.UpdateCmtContent(model, id);
            return StatusCode(response);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteComment([FromRoute] int id)
        {
            var response = await _commentService.DeleteComment(id);
            return StatusCode(response);
        }
    }
}