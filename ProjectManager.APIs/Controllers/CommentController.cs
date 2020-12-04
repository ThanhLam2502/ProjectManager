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

        [HttpPost]
        public async Task<IActionResult> InsertComment([FromBody] CommentViewModel model)
        {
            var response = await _commentService.InsertComment(model);
            return StatusCode(response);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateCmtContent([FromBody] CommentViewModel model,[FromRoute] int commentId)
        {
            var response = await _commentService.UpdateCmtContent(model, commentId);
            return StatusCode(response);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteComment([FromRoute] int commentId)
        {
            var response = await _commentService.DeleteComment(commentId);
            return StatusCode(response);
        }
    }
}