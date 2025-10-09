using API.Utils;
using System.Net;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace API.Middlewares
{
    public class ExceptionMiddleware(RequestDelegate next)
    {
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (ApiException e)
            {
                if (e.Identifier == Errors.NotFound)
                    context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                else
                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync($"{e.Identifier}: {e.Message}");
            }
            catch (Exception e)
            {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                await context.Response.WriteAsync($"{Errors.InternalServerError}: {e.Message}");
            }
        }
    }
}
