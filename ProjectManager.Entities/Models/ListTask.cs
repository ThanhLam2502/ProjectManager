using System.Collections.Generic;

namespace ProjectManager.Entities.Models
{
    public partial class ListTask
    {
        public ListTask()
        {
            TaskProject = new HashSet<TaskProject>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? ProjectId { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual Project Project { get; set; }
        public virtual ICollection<TaskProject> TaskProject { get; set; }
    }
}
