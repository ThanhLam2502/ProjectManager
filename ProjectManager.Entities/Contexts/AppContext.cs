using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ProjectManager.Entities.Models
{
    public partial class AppContext : DbContext
    {
        public AppContext()
        {
        }

        public AppContext(DbContextOptions<AppContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Comment> Comment { get; set; }
        public virtual DbSet<Project> Project { get; set; }
        public virtual DbSet<TaskItem> TaskItem { get; set; }
        public virtual DbSet<TaskProject> TaskProject { get; set; }
        public virtual DbSet<TaskUser> TaskUser { get; set; }
        public virtual DbSet<TodoItem> TodoItem { get; set; }
        public virtual DbSet<TodoTask> TodoTask { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#pragma warning disable CS1030 // #warning directive
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=.\\SQLEXPRESS;Initial Catalog=PM-FresherDB;User ID=sa;Password=123");
#pragma warning restore CS1030 // #warning directive
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Cmt).HasColumnType("ntext");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((0))");

                entity.Property(e => e.ParentId).HasColumnName("ParentID");

                entity.Property(e => e.TaskId).HasColumnName("TaskID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasForeignKey(d => d.ParentId)
                    .HasConstraintName("FK_Comment_Comment");

                entity.HasOne(d => d.Task)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.TaskId)
                    .HasConstraintName("FK_Comment_TaskItem");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Comment)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Comment_User");
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((0))");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.HasOne(d => d.AssignToNavigation)
                    .WithMany(p => p.Project)
                    .HasForeignKey(d => d.AssignTo)
                    .HasConstraintName("FK_Project_User");
            });

            modelBuilder.Entity<TaskItem>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AttachFiles).HasColumnType("text");

                entity.Property(e => e.Description).HasColumnType("ntext");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((0))");

                entity.Property(e => e.ListTaskId).HasColumnName("ListTaskID");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.HasOne(d => d.ListTask)
                    .WithMany(p => p.TaskItem)
                    .HasForeignKey(d => d.ListTaskId)
                    .HasConstraintName("FK_TaskP_ListTask");
            });

            modelBuilder.Entity<TaskProject>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((0))");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.ProjectId).HasColumnName("ProjectID");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.TaskProject)
                    .HasForeignKey(d => d.ProjectId)
                    .HasConstraintName("FK_ListTask_Project");
            });

            modelBuilder.Entity<TaskUser>(entity =>
            {
                entity.ToTable("Task_User");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.TaskId).HasColumnName("TaskID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Task)
                    .WithMany(p => p.TaskUser)
                    .HasForeignKey(d => d.TaskId)
                    .HasConstraintName("FK_TaskUser_Task");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TaskUser)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_TaskUser_User");
            });

            modelBuilder.Entity<TodoItem>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((0))");

                entity.Property(e => e.ListTodoId).HasColumnName("ListTodoID");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.HasOne(d => d.ListTodo)
                    .WithMany(p => p.TodoItem)
                    .HasForeignKey(d => d.ListTodoId)
                    .HasConstraintName("FK_Todo_ListTodo");
            });

            modelBuilder.Entity<TodoTask>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((0))");

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.TaskId).HasColumnName("TaskID");

                entity.HasOne(d => d.Task)
                    .WithMany(p => p.TodoTask)
                    .HasForeignKey(d => d.TaskId)
                    .HasConstraintName("FK_ListTodo_ProjectTask");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Img).HasColumnType("text");

                entity.Property(e => e.Name).HasMaxLength(50);
            });
        }
    }
}
