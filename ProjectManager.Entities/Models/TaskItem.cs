using System;
using System.Collections.Generic;

namespace ProjectManager.Entities.Models
{
    public partial class TaskItem
    {
        public TaskItem()
        {
            Comment = new HashSet<Comment>();
            TaskUser = new HashSet<TaskUser>();
            TodoTask = new HashSet<TodoTask>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string AttachFiles { get; set; }
        public int? Status { get; set; }
        public int? ListTaskId { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual TaskProject ListTask { get; set; }
        public virtual ICollection<Comment> Comment { get; set; }
        public virtual ICollection<TaskUser> TaskUser { get; set; }
        public virtual ICollection<TodoTask> TodoTask { get; set; }
    }
}
