using System;
using System.Collections.Generic;

namespace ProjectManager.Entities.Models
{
    public partial class ProjectTask
    {
        public ProjectTask()
        {
            TaskItem = new HashSet<TaskItem>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? ProjectId { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual Project Project { get; set; }
        public virtual ICollection<TaskItem> TaskItem { get; set; }
    }
}
