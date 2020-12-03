using System.Collections.Generic;

namespace ProjectManager.Entities.Models
{
    public partial class TaskProject
    {
        public TaskProject()
        {
            Comment = new HashSet<Comment>();
            ListTodo = new HashSet<ListTodo>();
            TaskUser = new HashSet<TaskUser>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string AttachFiles { get; set; }
        public int? Status { get; set; }
        public int? ListTaskId { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual ListTask ListTask { get; set; }
        public virtual ICollection<Comment> Comment { get; set; }
        public virtual ICollection<ListTodo> ListTodo { get; set; }
        public virtual ICollection<TaskUser> TaskUser { get; set; }
    }
}
