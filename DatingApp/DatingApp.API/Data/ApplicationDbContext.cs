using DatingApp.API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace DatingApp.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //seed to users
            string userJson = System.IO.File.ReadAllText("Data/UserSeedData.json");
            List<AppUser> users = System.Text.Json.JsonSerializer.Deserialize<List<AppUser>>(userJson);
            foreach (AppUser user in users)
            {
                using var hmac = new HMACSHA512();
                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                user.PasswordSalt = hmac.Key;
                modelBuilder.Entity<AppUser>().HasData(user);
            }
            //seed to photo
            string photoJson = System.IO.File.ReadAllText("Data/PhotoSeedData.json");
            List<Photo> photos = System.Text.Json.JsonSerializer.Deserialize<List<Photo>>(photoJson);
            foreach (Photo photo in photos)
            {
                modelBuilder.Entity<Photo>().HasData(photo);
            }

        }
    }
}
