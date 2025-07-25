using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserManagmentApp.Models
{
    public enum UserStatus { Active, Blocked }

    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public UserStatus Status { get; set; } = UserStatus.Active;

        public DateTime RegistrationTime { get; set; } = DateTime.UtcNow;

        public DateTime? LastLoginTime { get; set; }
    }
}
