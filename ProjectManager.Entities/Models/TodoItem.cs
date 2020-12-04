using System;
using System.Collections.Generic;

namespace ProjectManager.Entities.Models
{
    public partial class TodoItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool? IsComplete { get; set; }
        public int? ListTodoId { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual TaskTodo ListTodo { get; set; }
    }
}
