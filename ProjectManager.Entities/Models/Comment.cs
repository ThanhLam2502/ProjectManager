using System;
using System.Collections.Generic;

namespace ProjectManager.Entities.Models
{
    public partial class Comment
    {
        public Comment()
        {
            InverseParent = new HashSet<Comment>();
        }

        public int Id { get; set; }
        public string Cmt { get; set; }
        public int? UserId { get; set; }
        public int? TaskId { get; set; }
        public int? ParentId { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual Comment Parent { get; set; }
        public virtual TaskItem Task { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Comment> InverseParent { get; set; }
    }
}
