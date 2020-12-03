using ProjectManager.Core.Http;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectManager.Entities.Services
{
    public interface ICommentService : IBaseService<Comment>
    {
        Task<HttpResponse<List<CommentViewModel>>> GetCommentByTaskID(int taskId);
        Task<HttpResponse<int>> InsertComment(CommentViewModel model);
        Task<HttpResponse<int>> UpdateCmtContent(CommentViewModel model, int id);
        Task<HttpResponse<int>> DeleteComment(int id);
    }
}
