using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Entities;
using DatingApp.API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace DatingApp.API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ApplicationDbContext _dbContext;
        private ITokenService _tokenService;

        public AccountController(ApplicationDbContext dbContext, ITokenService tokenService)
        {
            _dbContext = dbContext;
            _tokenService = tokenService;
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username))
            { 
                return BadRequest("Username is already exists");
            }
            using var hmac = new HMACSHA512();
            var user = new AppUser 
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
            return new UserDto 
            {
                UserName = user.UserName,
                Token = _tokenService.GenerateToken(user)
            };
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(x => x.UserName == loginDto.Username);

            if (user == null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }

            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.GenerateToken(user)
            };
        }

        private async Task<bool> UserExists(string username) 
        {
            return await _dbContext.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}
