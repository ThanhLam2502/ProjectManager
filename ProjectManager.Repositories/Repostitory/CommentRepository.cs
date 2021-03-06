﻿using ProjectManager.Entities.Models;
using ProjectManager.Entities.Repositories;
using ProjectManager.Entities.ViewModels;
using System.Linq;

namespace ProjectManager.Repositories.Repostitory
{
    public static class CommentRepository
    {
        public static IQueryable<CommentViewModel> GetCommentByTaskID(this IRepository<Comment> repository, int taskId)
        {
            return repository.Entities
                .Where(cmt => cmt.TaskId == taskId && cmt.ParentId == null && cmt.IsDeleted != true)
               .Select(cmt => new CommentViewModel
               {
                   Id = cmt.Id,
                   Cmt = cmt.Cmt,
                   UserId = cmt.UserId,
                   UserName = cmt.User.Name,
                   Img = cmt.User.Img,
                   TaskId = cmt.TaskId,
                   ParentId = cmt.ParentId,
                   InverseParent = cmt.InverseParent
                   .Where(cm => cm.IsDeleted != true)
                   .Select(cm => new CommentViewModel
                   {
                       Id = cm.Id,
                       Cmt = cm.Cmt,
                       UserId = cm.UserId,
                       UserName = cm.User.Name,
                       Img = cm.User.Img,
                       TaskId = cm.TaskId,
                       ParentId = cm.ParentId,
                   })
               });
        }

    }
}
