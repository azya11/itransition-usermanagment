using Microsoft.AspNetCore.Mvc;
using UserManagmentApp.Data;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class UsersApiController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersApiController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetUsers()
    {
        var users = _context.Users
            .Select(u => new {
                u.Id,
                u.Name,
                u.Email,
                u.Status,
                u.LastLoginTime
            })
            .ToList();
        return Ok(users);
    }
}
