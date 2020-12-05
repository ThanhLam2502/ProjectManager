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
            CreateMap<ListTaskViewModel, TaskProject>().ReverseMap();
            CreateMap<TaskViewModel, TaskItem>().ReverseMap();
            CreateMap<ListTodoViewModel, TodoTask>().ReverseMap();
            CreateMap<TodoViewModel, TodoItem>().ReverseMap();
            CreateMap<CommentViewModel, Comment>().ReverseMap();
            CreateMap<UserViewModel, User>().ReverseMap();
        }

    }
}