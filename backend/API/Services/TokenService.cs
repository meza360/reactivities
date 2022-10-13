using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain.Entities;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService
    {
        public static SymmetricSecurityKey Key => new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Super long secret key"));
        private static string Algorithm = SecurityAlgorithms.HmacSha512Signature;
        private static SigningCredentials Credentials { get; } = new SigningCredentials(Key, Algorithm);
        private static JwtSecurityTokenHandler TokenHandler {get;} = new JwtSecurityTokenHandler();
        public string CreateToken(AppUser user)
        {
            IEnumerable<Claim> claims = new List<Claim>{
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email)
            };

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor{
                Audience = "App Users",
                Expires = DateTime.Now.AddDays(1),
                TokenType = "JWT",
                Subject = new ClaimsIdentity(claims),
                SigningCredentials = Credentials
            };

            SecurityToken token = TokenHandler.CreateToken(tokenDescriptor);

            return TokenHandler.WriteToken(token);
        }
    }
}