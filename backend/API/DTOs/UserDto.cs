using System;

namespace API.DTOs
{
    public class UserDto
    {
        public string DisplayName { get; set; } = String.Empty;
        public string Token { get; set; } = String.Empty;
        public string UserName { get; set; } = String.Empty;
        public string? Image { get; set; }
    }
}