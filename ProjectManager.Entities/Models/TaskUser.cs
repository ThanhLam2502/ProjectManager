﻿using System;
using System.Collections.Generic;

namespace ProjectManager.Entities.Models
{
    public partial class TaskUser
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? TaskId { get; set; }

        public virtual TaskItem Task { get; set; }
        public virtual User User { get; set; }
    }
}
