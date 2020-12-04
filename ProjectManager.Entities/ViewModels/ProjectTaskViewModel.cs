using ProjectManager.Entities.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ProjectManager.Entities.ViewModels
{
    public class ProjectTaskViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? Status { get; set; }
        public string StatusProjectString => ((StatusProject)Status).GetDescription();
        public int? AssignTo { get; set; }
        public IEnumerable<ListTaskViewModel> Tasks { get; set; }
    }

    public class ListTaskViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ProjectId { get; set; }
        public IEnumerable<TaskViewModel> Task { get; set; }
    }
    public class TaskViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string AttachFiles { get; set; }
        public int? Status { get; set; }
        public string StatusTaskString => ((StatusTask)Status).GetDescription();
        public int? ListTaskId { get; set; }
        public IEnumerable<UserViewModel> Members { get; set; }
        public IEnumerable<ListTodoViewModel> Todos { get; set; }
        public IEnumerable<CommentViewModel> Comments { get; set; }
    }
    public class ListTodoViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Percent => (Todo.Count() == 0 ? 0 : Math.Round((decimal)(Todo?.Count(_ => _.IsComplete == true) * 100 / Todo?.Count()), 0, MidpointRounding.AwayFromZero));
        public int? TaskId { get; set; }
        public IEnumerable<TodoViewModel> Todo { get; set; }
    }
    public class TodoViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool? IsComplete { get; set; }
        public int? ListTodoId { get; set; }
    }

    public class CommentViewModel
    {
        public int Id { get; set; }
        public string Cmt { get; set; }
        public int? UserId { get; set; }
        public string UserName { get; set; }
        public string Img { get; set; }
        public int? TaskId { get; set; }
        public int? ParentId { get; set; }
        public IEnumerable<CommentViewModel> InverseParent { get; set; }
    }

    public class UserViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Img { get; set; }
    }
}
