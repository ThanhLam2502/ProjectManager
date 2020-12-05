using AutoMapper;
using ProjectManager.Core.Http;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.Resources;
using ProjectManager.Entities.Services;
using ProjectManager.Entities.UnitOfWork;
using ProjectManager.Entities.ViewModels;
using System.Threading.Tasks;

namespace ProjectManager.Services
{
    public class CommentService : BaseService<Comment>, ICommentService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public CommentService(IUnitOfWork unitOfWork, IMapper mapper): base(unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<BaseResult<int>> InsertComment(CommentViewModel model)
        {
            var comment = _mapper.Map<Comment>(model);
            await Repository.InsertAsync(comment);
            return BaseResult<int>.OK(comment.Id, Messages.ItemInserted);
        }

        public async Task<BaseResult<int>> UpdateCommentContent(CommentViewModel model, int commentId)
        {
            var comment = await Repository.FindAsync(commentId);
            if (comment == null)
                return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            comment.Cmt = model.Cmt;
          

            int saved = await _unitOfWork.SaveChangesAsync();

            if (saved > 0)
                return BaseResult<int>.OK(model.Id, Messages.ItemUpdated);

            return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);
        }

        public async Task<BaseResult<int>> DeleteComment(int commentId)
        {
            var comment = await Repository.FindAsync(commentId);
            if (comment == null)
                return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            comment.IsDeleted = true;
            var saved = await _unitOfWork.SaveChangesAsync();
            if (saved > 0)
                return BaseResult<int>.OK(commentId, Messages.ItemDeleted);

            return BaseResult<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);
        }
    }
}
