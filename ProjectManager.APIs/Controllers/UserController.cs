using Microsoft.AspNetCore.Mvc;
using ProjectManager.Entities.Services;
using System.Threading.Tasks;

namespace ProjectManager.APIs.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : BaseApiController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/users
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var response = await _userService.GetAllUsers();
            return StatusCode(response);
        }
    }
}