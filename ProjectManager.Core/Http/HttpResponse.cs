using System.Net;
using System.Text.Json.Serialization;

namespace ProjectManager.Core.Http
{
    public class HttpResponse : IHttpResponse
    {
        [JsonIgnore]
        public int StatusCode { get; set; }

        public string Message { get; set; }
    }

    public class HttpResponse<T> : HttpResponse, IHttpResponse<T>
    {
        public T Data { get; set; }

        public static HttpResponse<T> OK(T data = default(T)
            , string message = null
            , HttpStatusCode statusCode = HttpStatusCode.OK)
        {
            return new HttpResponse<T>()
            {
                Data = data,
                Message = message,
                StatusCode = (int)statusCode
            };
        }

        public static HttpResponse<T> Error(string message = null
            , HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
        {
            return new HttpResponse<T>()
            {
                Message = message,
                StatusCode = (int)statusCode
            };
        }
    }
}
