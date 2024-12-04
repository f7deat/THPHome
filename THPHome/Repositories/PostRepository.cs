using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using Microsoft.EntityFrameworkCore;
using ApplicationCore.Helpers;
using ApplicationCore.Enums;
using ApplicationCore.Models.Posts;
using ApplicationCore.Models.Filters;
using WebUI.Models.ViewModel;
using WebUI.Models.Categories;
using Microsoft.AspNetCore.Identity;
using THPIdentity.Entities;
using THPCore.Enums;
using WebUI.Foundations.Interfaces;
using WebUI.Models.Results.Posts;

namespace Infrastructure.Repositories;

public class PostRepository : EfRepository<Post>, IPostRepository
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ICurrentUser _currentUser;
    public PostRepository(ApplicationDbContext _context, UserManager<ApplicationUser> userManager, ICurrentUser currentUser) : base(_context)
    {
        _userManager = userManager;
        _currentUser = currentUser;
    }

    public async Task<PaginatedList<Post>> GetListPostByTagIdAsync(int tagId, int current, int pageSize)
    {
        var query = from a in _context.Posts.Where(x => x.Status == PostStatus.PUBLISH)
                    select a;
        return await PaginatedList<Post>.CreateAsync(query.AsNoTracking(), current, pageSize);
    }

    public async Task<int> GetTotalViewAsync()
    {
        try
        {
            return await _context.Posts.SumAsync(x => x.View);
        }
        catch (Exception)
        {
            return 0;
        };
    }

    public async Task<IEnumerable<Post>> GetTopViewAsync(int pageSize)
    {
        try
        {
            return await _context.Posts.OrderByDescending(x => x.View).Take(pageSize).ToListAsync();
        }
        catch (Exception)
        {
            return default;
        }
    }

    public async Task<dynamic?> GetDataBarChartAsync()
    {
        try
        {
            return await _context.Posts.Where(x => x.CreatedDate.Year == DateTime.Now.Year).GroupBy(x => x.CreatedDate.Month).Select(y => new { y.Key, Count = y.Count() }).ToListAsync();
        }
        catch (Exception)
        {
            return default;
        }
    }

    public async Task<dynamic> GetListAsync(PostFilterOptions filterOptions)
    {
        var userId = _currentUser.GetId();
        var query = from a in _context.Posts.Where(x => filterOptions.Type == null || x.Type == filterOptions.Type)
                    select new
                    {
                        a.Id,
                        a.Title,
                        a.View,
                        a.ModifiedDate,
                        a.Url,
                        a.Status,
                        a.Language,
                        a.CreatedDate,
                        a.CreatedBy,
                        a.Description,
                        a.Thumbnail,
                        a.IssuedDate
                    };
        if (!string.IsNullOrWhiteSpace(filterOptions.Title))
        {
            query = query.Where(x => !string.IsNullOrEmpty(x.Title) && x.Title.ToLower().Contains(filterOptions.Title));
        }
        if (filterOptions.Status != null)
        {
            query = query.Where(x => x.Status == filterOptions.Status);
        }
        if (!filterOptions.CanSeeAll)
        {
            query = query.Where(x => x.CreatedBy == userId);
        }
        query = query.Where(x => x.Language == filterOptions.Language).OrderByDescending(x => x.IssuedDate);
        var total = await query.CountAsync();
        var data = await query.Skip((filterOptions.Current - 1) * filterOptions.PageSize).Take(filterOptions.PageSize).AsNoTracking()
            .Select(x => new PostListItemResult
            {
                Id = x.Id,
                Url = x.Url,
                ModifiedDate = x.ModifiedDate,
                View = x.View,
                Title = x.Title,
                Status = x.Status,
                CreatedBy = x.CreatedBy,
                CreatedDate = x.CreatedDate,
                CanUpdate = x.CreatedBy == userId,
                Thumbnail = x.Thumbnail,
                IssuedDate = x.IssuedDate
            }).ToListAsync();
        var users = await _userManager.Users.Where(x => x.UserType != UserType.Student).ToListAsync();

        foreach (var item in data)
        {
            item.CreatedBy = users.FirstOrDefault(x => x.Id == item.CreatedBy)?.Name;
        }
        return new { data, total };
    }

    public async Task<ListResult<dynamic>> GetInCategoryAsync(PostInCategoryFilterOptions filterOptions)
    {
        var query = from a in _context.PostCategories.Where(x => x.CategoryId == filterOptions.CategoryId)
                    join b in _context.Posts on a.PostId equals b.Id
                    where b.Language == filterOptions.Language
                    orderby b.ModifiedDate descending
                    select b;
        return await ListResult<dynamic>.Success(query, filterOptions);
    }

    public async Task<bool> IsExistInCategory(int id) => await _context.PostCategories.AnyAsync(x => x.CategoryId == id);

    public async Task<dynamic> AddRangeAsync(List<Post> posts)
    {
        await _context.Posts.AddRangeAsync(posts);
        await _context.SaveChangesAsync();
        return new { succeeded = true };
    }

    public async Task<dynamic> SetStatusAsync(Post post)
    {
        var data = await _context.Posts.FindAsync(post.Id);
        if (data is null) return new { succeeded = false };
        data.Status = post.Status;
        return new { succeeded = await _context.SaveChangesAsync() > 0 };
    }

    public async Task<int> IncreaseViewAsync(Post post)
    {
        post.View++;
        await _context.SaveChangesAsync();
        return post.View;
    }

    public IQueryable<PostView> GetListInCategory(int categoryId, string searchTerm) => from a in _context.PostCategories.Where(x => x.CategoryId == categoryId)
                                                                                        join b in _context.Posts on a.PostId equals b.Id
                                                                                        where (string.IsNullOrEmpty(searchTerm) || b.Title.Contains(searchTerm)) && b.Status == PostStatus.PUBLISH
                                                                                        orderby b.CreatedDate descending
                                                                                        select new PostView
                                                                                        {
                                                                                            Id = b.Id,
                                                                                            Description = b.Description,
                                                                                            ModifiedDate = b.ModifiedDate,
                                                                                            Thumbnail = b.Thumbnail,
                                                                                            Title = b.Title,
                                                                                            Url = b.Url,
                                                                                            View = b.View
                                                                                        };

    public async Task<IEnumerable<PostView>> GetListRandomAsync(int pageSize, int categoryId = 0)
    {
        var query = from a in _context.Posts
                    join b in _context.PostCategories on a.Id equals b.PostId
                    where (categoryId == 0 || b.CategoryId == categoryId) && a.Status == PostStatus.PUBLISH
                    orderby Guid.NewGuid()
                    select new PostView
                    {
                        Id = a.Id,
                        Description = a.Description,
                        ModifiedDate = a.ModifiedDate,
                        Thumbnail = a.Thumbnail,
                        Title = a.Title,
                        Url = a.Url,
                        View = a.View
                    };
        return await query.Take(pageSize).ToListAsync();
    }

    public async Task<IEnumerable<Post>> GetListAsync(PostType type) => await _context.Posts.Where(x => x.Type == type).ToListAsync();

    public async Task<int> GetCountInUserAsync(string id) => await _context.Posts.CountAsync(x => x.CreatedBy == id || x.ModifiedBy == id);

    public async Task<PaginatedList<PostView>> GetPostsInTagSync(string name, string searchTerm)
    {
        var query = from a in _context.Posts
                    where a.Tags.ToLower().Contains(name) && (string.IsNullOrEmpty(searchTerm) || a.Title.ToLower().Contains(searchTerm)) && a.Status == PostStatus.PUBLISH
                    select new PostView
                    {
                        Title = a.Title,
                        Description = a.Description,
                        Id = a.Id,
                        ModifiedDate = a.ModifiedDate,
                        Thumbnail = a.Thumbnail,
                        Url = a.Url,
                        View = a.View
                    };
        return await PaginatedList<PostView>.CreateAsync(query, 1, 12);
    }

    public async Task<IEnumerable<PostView>> GetRandomPostsAsync() => await _context.Posts.Where(x => x.Status == PostStatus.PUBLISH).OrderBy(x => Guid.NewGuid()).Take(5).Select(x => new PostView
    {
        Id = x.Id,
        ModifiedDate = x.ModifiedDate,
        Thumbnail = x.Thumbnail,
        Title = x.Title,
        Url = x.Url,
        View = x.View
    }).ToListAsync();

    public async Task<PaginatedList<PostView>> GetListAsync(int current) => await PaginatedList<PostView>.CreateAsync(_context.Posts.Where(x => x.Status == PostStatus.PUBLISH).OrderByDescending(x => x.ModifiedDate).Select(x => new PostView
    {
        Id = x.Id,
        Description = x.Description,
        ModifiedDate = x.ModifiedDate,
        Thumbnail = x.Thumbnail,
        Title = x.Title,
        Url = x.Url,
        View = x.View
    }), current, 8);

    public async Task<IEnumerable<Post>> GetListPopularAsync() => await _context.Posts.OrderByDescending(x => x.View).Take(5).ToListAsync();

    public async Task<IEnumerable<Post>> GetListByUserAsync(string id) => await _context.Posts.Where(x => x.CreatedBy == id).OrderByDescending(x => x.ModifiedDate).ToListAsync();

    public async Task<IEnumerable<PostView>> GetListInTagAsync(string tagName, int pageSize) => await _context.Posts.Where(x => x.Tags.Contains(tagName)).OrderByDescending(x => x.Id).Take(pageSize).Select(x => new PostView
    {
        Id = x.Id,
        Description = x.Description,
        ModifiedDate = x.ModifiedDate,
        Thumbnail = x.Thumbnail,
        Title = x.Title,
        Url = x.Url,
        View = x.View
    }).ToListAsync();

    public async Task<IEnumerable<PostView>> GetLastedListAsync(int pageSize) => await _context.Posts.Where(x => x.Status == PostStatus.PUBLISH).OrderByDescending(x => x.Id).Take(pageSize).Select(x => new PostView
    {
        Id = x.Id,
        Description = x.Description,
        ModifiedDate = x.ModifiedDate,
        Thumbnail = x.Thumbnail,
        Title = x.Title,
        Url = x.Url,
        View = x.View
    }).ToListAsync();

    public async Task<IEnumerable<Post>> GetRelatedListAsync(string keyword, int pageSize) => await _context.Posts.Where(x => x.Title.ToLower().Contains(keyword.ToLower())).OrderByDescending(x => x.Id).Take(pageSize).ToListAsync();

    public async Task<PaginatedList<PostView>> SearchAsync(string searchTerm, int? categoryId, int current, int pageSize)
    {
        var query = from a in _context.Posts
                    join b in _context.PostCategories on a.Id equals b.PostId
                    where a.Title.ToLower().Contains(searchTerm) && (b.CategoryId == categoryId || categoryId == null) && a.Status == PostStatus.PUBLISH
                    orderby a.ModifiedDate descending
                    select new PostView
                    {
                        Id = a.Id,
                        Description = a.Description,
                        ModifiedDate = a.ModifiedDate,
                        Thumbnail = a.Thumbnail,
                        Title = a.Title,
                        Url = a.Url,
                        View = a.View
                    };
        return await PaginatedList<PostView>.CreateAsync(query, current, pageSize);
    }

    public async Task<IEnumerable<PostView>> GetListByCategoryAsync(string normalizeName, int current, int pageSize)
    {
        var query = from a in _context.Categories
                    join b in _context.PostCategories on a.Id equals b.CategoryId
                    join c in _context.Posts on b.PostId equals c.Id
                    where a.NormalizeName == normalizeName && c.Status == PostStatus.PUBLISH
                    orderby c.ModifiedDate descending
                    select new PostView
                    {
                        Id = c.Id,
                        Description = c.Description,
                        ModifiedDate = c.ModifiedDate,
                        Thumbnail = c.Thumbnail,
                        Title = c.Title,
                        Url = c.Url,
                        View = c.View
                    };
        return await query.Skip((current - 1) * pageSize).Take(pageSize).ToListAsync();
    }

    public async Task<List<CategoryWithPost>> GetListByAllCategoryAsync()
    {
        var returnValue = new List<CategoryWithPost>();
        var categories = await _context.Categories.OrderBy(x => x.Index).Where(x => x.IsDisplayOnHome == true).ToListAsync();
        foreach (var item in categories)
        {
            var posts = from a in _context.PostCategories
                        join b in _context.Posts on a.PostId equals b.Id
                        where a.CategoryId == item.Id && b.Status == PostStatus.PUBLISH
                        orderby b.ModifiedDate
                        select new PostView
                        {
                            Id = b.Id,
                            Description = b.Description,
                            ModifiedDate = b.ModifiedDate,
                            Thumbnail = b.Thumbnail,
                            Title = b.Title,
                            View = b.View,
                            Url = b.Url
                        };
            returnValue.Add(new CategoryWithPost
            {
                CategoryId = item.Id,
                CategoryName = item.Name,
                ListPosts = posts.ToList()
            });
        }
        return returnValue;
    }

    public async Task<IEnumerable<PostView>> GetListByTypeAsync(PostType type, int current, int pageSize, Language language)
    {
        return await _context.Posts.Where(x => x.Type == type && x.Status == PostStatus.PUBLISH && x.Language == language)
            .OrderByDescending(x => x.CreatedDate).Skip((current - 1) * pageSize).Take(pageSize).Select(x => new PostView
        {
            Id = x.Id,
            Description = x.Description,
            ModifiedDate = x.CreatedDate,
            Thumbnail = x.Thumbnail,
            Title = x.Title,
            Url = x.Url,
            View = x.View
        }).ToListAsync();
    }

    public async Task<Post> EnsureDataAsync(string url, PostType pAGE, Language locale)
    {
        var post = await _context.Posts.FirstOrDefaultAsync(x => x.Url == url && x.Type == pAGE && x.Language == locale);
        if (post is null)
        {
            post = new Post
            {
                Title = url,
                Url = url,
                Language = locale,
                Status = PostStatus.PUBLISH,
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now,
                Type = pAGE,
                View = 0
            };
            await _context.Posts.AddAsync(post);
            await _context.SaveChangesAsync();
        }
        post.View++;
        _context.Update(post);
        await _context.SaveChangesAsync();
        return post;
    }
}
