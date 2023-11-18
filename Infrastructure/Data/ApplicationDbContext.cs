using ApplicationCore.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

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
        public virtual DbSet<Partner> Partners { get; set; }
        public virtual DbSet<Video> Videos { get; set; }
        public virtual DbSet<Attachment> Attachments { get; set; }
        public virtual DbSet<Department> Departments { get; set; }
        public virtual DbSet<DeparmentDetail> DeparmentDetails { get; set; }
        public virtual DbSet<DeparmentUser> DeparmentUsers { get; set; }
    }
}
