namespace ProjectManager.Core.Http
{
    public interface IHttpResponse
    {
        int StatusCode { get; set; }
        string Message { get; set; }
    }

    public interface IHttpResponse<T> : IHttpResponse
    {
        T Data { get; set; }
    }
}
