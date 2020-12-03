using Microsoft.AspNetCore.Mvc;
using ProjectManager.Core.Http;

namespace ProjectManager.APIs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        [NonAction]
        public virtual ActionResult StatusCode(IHttpResponse response)
        {
            return StatusCode(response.StatusCode, response);
        }
    }
}
