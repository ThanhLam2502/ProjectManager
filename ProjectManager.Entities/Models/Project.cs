using System;
using System.Collections.Generic;

namespace ProjectManager.Entities.Models
{
    public partial class Project
    {
        public Project()
        {
            ProjectTask = new HashSet<ProjectTask>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? Status { get; set; }
        public int? AssignTo { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual User AssignToNavigation { get; set; }
        public virtual ICollection<ProjectTask> ProjectTask { get; set; }
    }
}
