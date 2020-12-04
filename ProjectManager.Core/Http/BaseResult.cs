using System.Net;
using System.Text.Json.Serialization;

namespace ProjectManager.Core.Http
{
    public class BaseResult : IBaseResult
    {
        [JsonIgnore]
        public int StatusCode { get; set; }

        public string Message { get; set; }
    }

    public class BaseResult<T> : BaseResult, IHttpResponse<T>
    {
        public T Data { get; set; }

        public static BaseResult<T> OK(T data = default(T)
            , string message = null
            , HttpStatusCode statusCode = HttpStatusCode.OK)
        {
            return new BaseResult<T>()
            {
                Data = data,
                Message = message,
                StatusCode = (int)statusCode
            };
        }

        public static BaseResult<T> Error(string message = null
            , HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
        {
            return new BaseResult<T>()
            {
                Message = message,
                StatusCode = (int)statusCode
            };
        }
    }
}
