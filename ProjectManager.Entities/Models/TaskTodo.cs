using System.Collections.Generic;

namespace ProjectManager.Entities.Models
{
    public partial class TaskTodo
    {
        public TaskTodo()
        {
            TodoItem = new HashSet<TodoItem>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? TaskId { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual TaskItem Task { get; set; }
        public virtual ICollection<TodoItem> TodoItem { get; set; }
    }
}
