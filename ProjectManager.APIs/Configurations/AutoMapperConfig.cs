using AutoMapper;
using ProjectManager.Entities.Models;
using ProjectManager.Entities.ViewModels;

namespace ProjectManager.APIs.Configurations
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<ProjectTaskViewModel, Project>().ReverseMap();
            CreateMap<ListTaskViewModel, ListTask>().ReverseMap();
            CreateMap<TaskViewModel, TaskProject>().ReverseMap();
            CreateMap<ListTodoViewModel, ListTodo>().ReverseMap();
            CreateMap<TodoViewModel, Todo>().ReverseMap();
            CreateMap<CommentViewModel, Comment>().ReverseMap();
            CreateMap<UserViewModel, User>().ReverseMap();
        }

    }
}