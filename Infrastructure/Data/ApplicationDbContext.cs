using ApplicationCore.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            // dotnet ef migrations add InitialCreate -s WebUI -p Infrastructure
            // dotnet ef database update -s WebUI -p Infrastructure
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<PostCategory>().HasKey(k => new { k.PostId, k.CategoryId });
            base.OnModelCreating(builder);
        }
        public virtual DbSet<Post> Posts { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Banner> Banners { get; set; }
        public virtual DbSet<PostCategory> PostCategories { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<Menu> Menus { get; set; }
    }
}
