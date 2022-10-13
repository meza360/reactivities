using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = String.Empty;
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage ="Password does not compliance with complexity requirements")]
        public string Password { get; set; } = String.Empty;
        [Required]
        public string DisplayName { get; set; } = String.Empty;
        [Required]
        public string UserName { get; set; } = String.Empty;
    }
}