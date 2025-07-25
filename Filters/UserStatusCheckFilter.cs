using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;
using System.Security.Claims;
using UserManagmentApp.Data;
using UserManagmentApp.Models;
using Microsoft.AspNetCore.Authentication;

namespace UserManagmentApp.Filters
{
    public class UserStatusCheckFilter : IActionFilter
    {
        private readonly AppDbContext _context;

        public UserStatusCheckFilter(AppDbContext context)
        {
            _context = context;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var httpContext = context.HttpContext;
            var user = httpContext.User;

            // Allow anonymous access to login and register
            var path = httpContext.Request.Path.Value?.ToLower();
            if (path != null && (path.Contains("/account/login") || path.Contains("/account/register")))
                return;

            if (user.Identity?.IsAuthenticated == true)
            {
                var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (int.TryParse(userId, out int id))
                {
                    var dbUser = _context.Users.FirstOrDefault(u => u.Id == id);
                    if (dbUser == null || dbUser.Status == UserStatus.Blocked)
                    {
                        // Sign out and redirect to login
                        context.Result = new RedirectToActionResult("Login", "Account", new { });
                        httpContext.SignOutAsync();
                    }
                }
            }
        }

        public void OnActionExecuted(ActionExecutedContext context) { }
    }
}
