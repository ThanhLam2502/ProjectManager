using AutoMapper;
using ProjectManager.Core.Http;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.Resources;
using ProjectManager.Entities.Services;
using ProjectManager.Entities.UnitOfWork;
using ProjectManager.Entities.ViewModels;
using ProjectManager.Repositories.Repostitory;
using System.Collections.Generic;
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

        public Task<HttpResponse<List<CommentViewModel>>> GetCommentByTaskID(int taskId)
        {
            var comments = Repository.GetCommentByTaskID(taskId);
            return comments;
        }

        public async Task<HttpResponse<int>> InsertComment(CommentViewModel model)
        {
            var comment = _mapper.Map<Comment>(model);
            await Repository.InsertAsync(comment);
            return HttpResponse<int>.OK(comment.Id, Messages.ItemInserted);
        }

        public async Task<HttpResponse<int>> UpdateCmtContent(CommentViewModel model, int id)
        {
            var comment = await Repository.FindAsync(id);
            if (comment == null)
                return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            comment.Cmt = model.Cmt;
          

            int saved = await _unitOfWork.SaveChangesAsync();

            if (saved > 0)
                return HttpResponse<int>.OK(model.Id, Messages.ItemUpdated);

            return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);
        }

        public async Task<HttpResponse<int>> DeleteComment(int id)
        {
            var comment = await Repository.FindAsync(id);
            if (comment == null)
                return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.NoContent);

            comment.IsDeleted = true;
            var saved = await _unitOfWork.SaveChangesAsync();
            if (saved > 0)
                return HttpResponse<int>.OK(id, Messages.ItemDeleted);

            return HttpResponse<int>.Error(Messages.ActionFailed, statusCode: System.Net.HttpStatusCode.BadRequest);
        }
    }
}
