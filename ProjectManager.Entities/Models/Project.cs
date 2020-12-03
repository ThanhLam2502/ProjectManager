using System;
using System.Collections.Generic;

namespace ProjectManager.Entities.Models
{
    public partial class Project
    {
        public Project()
        {
            ListTask = new HashSet<ListTask>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? Status { get; set; }
        public int? AssignTo { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual User AssignToNavigation { get; set; }
        public virtual ICollection<ListTask> ListTask { get; set; }
    }
}
