using ApplicationCore.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using THPHome.Entities;
using THPHome.Entities.Contacts;
using THPHome.Entities.Curriculum;
using THPHome.Entities.Notifications;
using THPHome.Entities.QA;
using THPHome.Entities.Users;
using THPHome.Entities.Utils;
using WebUI.Entities;
using WebUI.Entities.Articles;
using WebUI.Entities.Communications;
using WebUI.Entities.Departments;
using WebUI.Foundations.Interfaces;

namespace THPHome.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, ICurrentUser _currentUser) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<PostCategory>().HasKey(k => new { k.PostId, k.CategoryId });
        base.OnModelCreating(builder);
    }

    public DbSet<Post> Posts { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Banner> Banners { get; set; }
    public DbSet<PostCategory> PostCategories { get; set; }
    public DbSet<Menu> Menus { get; set; }
    public DbSet<Partner> Partners { get; set; }
    public DbSet<Video> Videos { get; set; }
    public DbSet<Attachment> Attachments { get; set; }
    public DbSet<Department> Departments { get; set; }
    public DbSet<DepartmentDetail> DepartmentDetails { get; set; }
    public DbSet<DepartmentUser> DepartmentUsers { get; set; }
    public DbSet<Localization> Localizations { get; set; }
    public DbSet<Block> Blocks { get; set; }
    public DbSet<PostBlock> PostBlocks { get; set; }
    public DbSet<ApplicationFile> ApplicationFiles { get; set; }
    public DbSet<ApplicationFolder> ApplicationFolders { get; set; }
    public DbSet<Gallery> Galleries { get; set; }
    public DbSet<Photo> Photos { get; set; }
    public DbSet<QaGroup> QaGroups { get; set; }
    public DbSet<QaItem> QaItems { get; set; }
    public DbSet<ApplicationSetting> ApplicationSettings { get; set; }
    public DbSet<ZaloArticle> ZaloArticles { get; set; }
    public DbSet<EmailLog> EmailLogs { get; set; }
    public DbSet<DepartmentType> DepartmentTypes { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<UserNotification> UserNotifications { get; set; }

    #region Utils
    public DbSet<UrlShortener> UrlShorteners { get; set; }
    #endregion

    #region Contacts
    public DbSet<Contact> Contacts { get; set; }
    public DbSet<ContactStatus> ContactStatuses { get; set; }
    #endregion

    #region Curriculum - Đào tạo
    public DbSet<TrainingGroup> TrainingGroups { get; set; }
    public DbSet<FieldOfStudy> FieldOfStudies { get; set; }
    public DbSet<Major> Majors { get; set; }
    public DbSet<AcademicProgram> AcademicPrograms { get; set; }
    #endregion

    #region Users
    public DbSet<AcademicDegree> AcademicDegrees { get; set; }
    public DbSet<AcademicTitle> AcademicTitles { get; set; }
    public DbSet<UserDetail> UserDetails { get; set; }
    public DbSet<Country> Countries { get; set; }
    #endregion

    public DbSet<ApplicationLog> Logs { get; set; }

    public Task<int> SaveChangesAsync(bool audit)
    {
        if (audit) return base.SaveChangesAsync();

        var entries = ChangeTracker.Entries<IBaseEntity>().Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

        foreach (var entry in entries)
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedDate = DateTime.Now;
                entry.Entity.ModifiedDate = DateTime.Now;
                entry.Entity.CreatedBy = _currentUser.GetId();
            }
            if (entry.State == EntityState.Modified)
            {
                entry.Entity.ModifiedDate = DateTime.Now;
                entry.Entity.ModifiedBy = _currentUser.GetId();
            }
        }

        return base.SaveChangesAsync();
    }
}
