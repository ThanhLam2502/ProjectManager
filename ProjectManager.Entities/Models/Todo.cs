namespace ProjectManager.Entities.Models
{
    public partial class Todo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool? IsComplete { get; set; }
        public int? ListTodoId { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual ListTodo ListTodo { get; set; }
    }
}
