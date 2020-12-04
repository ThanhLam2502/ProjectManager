namespace ProjectManager.Core.Http
{
    public interface IBaseResult
    {
        int StatusCode { get; set; }
        string Message { get; set; }
    }

    public interface IHttpResponse<T> : IBaseResult
    {
        T Data { get; set; }
    }
}
