using ProjectManager.Core.Http;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjectManager.Entities.Services
{
    public interface ICommentService : IBaseService<Comment>
    {
        Task<BaseResult<int>> InsertComment(CommentViewModel model);
        Task<BaseResult<int>> UpdateCommentContent(CommentViewModel model, int commentId);
        Task<BaseResult<int>> DeleteComment(int commentId);
    }
}
