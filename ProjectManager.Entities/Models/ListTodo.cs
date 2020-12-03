using System.Collections.Generic;

namespace ProjectManager.Entities.Models
{
    public partial class ListTodo
    {
        public ListTodo()
        {
            Todo = new HashSet<Todo>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? TaskId { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual TaskProject Task { get; set; }
        public virtual ICollection<Todo> Todo { get; set; }
    }
}
