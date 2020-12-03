namespace ProjectManager.Entities.Models.Extensions
{
    public class AppErrorModel
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Detail { get; set; }        

        public AppErrorModel()
        {
            
        }

        public AppErrorModel(string message)
        {
            Message = message;
        }

        public AppErrorModel(string message, string detail) : this (message)
        {
            Detail = detail;
        }

        public AppErrorModel(string message, string detail, int statusCode) : this(message)
        {
            Detail = detail;
            StatusCode = statusCode;
        }
    }
}
