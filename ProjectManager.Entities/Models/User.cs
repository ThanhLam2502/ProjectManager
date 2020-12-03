using System.Collections.Generic;

namespace ProjectManager.Entities.Models
{
    public partial class User
    {
        public User()
        {
            Comment = new HashSet<Comment>();
            Project = new HashSet<Project>();
            TaskUser = new HashSet<TaskUser>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Img { get; set; }

        public virtual ICollection<Comment> Comment { get; set; }
        public virtual ICollection<Project> Project { get; set; }
        public virtual ICollection<TaskUser> TaskUser { get; set; }
    }
}
