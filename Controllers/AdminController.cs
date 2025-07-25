using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagmentApp.Data;
using System.Threading.Tasks;
using System.Linq;

namespace UserManagmentApp.Controllers
{
    [Authorize]
    public class AdminController : Controller
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var users = await _context.Users
                .OrderByDescending(u => u.LastLoginTime)
                .ToListAsync();
            return View(users);
        }

        [HttpPost]
        public async Task<IActionResult> Block([FromForm] int[] selectedIds)
        {
            if (selectedIds != null && selectedIds.Length > 0)
            {
                var users = await _context.Users.Where(u => selectedIds.Contains(u.Id)).ToListAsync();
                foreach (var user in users)
                {
                    user.Status = Models.UserStatus.Blocked;
                }
                await _context.SaveChangesAsync();
                TempData["StatusMessage"] = $"Blocked {users.Count} user(s).";
            }
            else
            {
                TempData["StatusMessage"] = "No users selected.";
            }
            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<IActionResult> Unblock([FromForm] int[] selectedIds)
        {
            if (selectedIds != null && selectedIds.Length > 0)
            {
                var users = await _context.Users.Where(u => selectedIds.Contains(u.Id)).ToListAsync();
                foreach (var user in users)
                {
                    user.Status = Models.UserStatus.Active;
                }
                await _context.SaveChangesAsync();
                TempData["StatusMessage"] = $"Unblocked {users.Count} user(s).";
            }
            else
            {
                TempData["StatusMessage"] = "No users selected.";
            }
            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<IActionResult> Delete([FromForm] int[] selectedIds)
        {
            if (selectedIds != null && selectedIds.Length > 0)
            {
                var users = await _context.Users.Where(u => selectedIds.Contains(u.Id)).ToListAsync();
                _context.Users.RemoveRange(users);
                await _context.SaveChangesAsync();
                TempData["StatusMessage"] = $"Deleted {users.Count} user(s).";
            }
            else
            {
                TempData["StatusMessage"] = "No users selected.";
            }
            return RedirectToAction("Index");
        }
    }
}
