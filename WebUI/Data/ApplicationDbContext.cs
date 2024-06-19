using ApplicationCore.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebUI.Entities;

namespace Infrastructure;

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
    public virtual DbSet<DepartmentDetail> DepartmentDetails { get; set; }
    public virtual DbSet<DepartmentUser> DepartmentUsers { get; set; }
    public virtual DbSet<Localization> Localizations { get; set; }
    public virtual DbSet<Block> Blocks { get; set; }
    public virtual DbSet<PostBlock> PostBlocks { get; set; }
    public virtual DbSet<ApplicationFile> ApplicationFiles { get; set; }
    public virtual DbSet<ApplicationFolder> ApplicationFolders { get; set; }
    public virtual DbSet<Gallery> Galleries { get; set; }
    public virtual DbSet<Photo> Photos { get; set; }
    public virtual DbSet<QaGroup> QaGroups { get; set; }
    public virtual DbSet<QaItem> QaItems { get; set; }
    public virtual DbSet<ApplicationSetting> ApplicationSettings { get; set; }
}
