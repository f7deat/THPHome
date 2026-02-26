using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Interfaces.IRepository;
using THPHome.Models.Args.VideoBulletin;
using THPHome.Models.Filters.VideoBulletin;
using THPHome.Repositories.Base;
using THPIdentity.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace THPHome.Repositories;
public class VideoBulletinRepository(ApplicationDbContext context, UserManager<ApplicationUser> _userManager) : EfRepository<VideoBulletin>(context), IVideoBulletinRepository
{
    public async Task<ListResult<object>> ListAsync(VideoBulletinFilterOptions filterOptions)
    {
        var query = from a in _context.VideoBulletins
                    select new
                    {
                        a.Id,
                        a.Volume,
                        a.YoutubeId,
                        a.CreatedDate,
                        a.CreatedBy,
                        a.ModifiedDate,
                        a.ModifiedBy,
                    };
        if (filterOptions.Volume != 0)
        {
            query = query.Where(e => e.Volume == filterOptions.Volume);
        }
        var data = await query.OrderByDescending(x => x.CreatedDate).Skip((filterOptions.Current - 1) * filterOptions.PageSize).Take(filterOptions.PageSize).ToListAsync();
        var users = await _userManager.Users.Where(x => x.UserType != UserType.Student).ToListAsync();
        return new ListResult<object>(data.Select(x =>
        {
            var creator = users.FirstOrDefault(u => u.Id == x.CreatedBy);
            var editor = users.FirstOrDefault(u => u.Id == x.ModifiedBy);
            return new
            {
                x.Id,
                x.Volume,
                x.YoutubeId,
                x.CreatedDate,
                x.ModifiedDate,
                CreatedBy = creator != null ? creator.Name : string.Empty,
                ModifiedBy = editor != null ? editor.Name : string.Empty
            };
        }), await query.CountAsync(), filterOptions);
    }

    public async Task<bool> ExistCreateDataAsync(VideoBulletinCreateArgs dept)
    {
        return await _context.VideoBulletins.AnyAsync(x => x.Volume == dept.Volume);
    }

    public async Task<bool> ExistUpdateDataAsync(VideoBulletinUpdateArgs dept)
    {
        return await _context.VideoBulletins.AnyAsync(x => x.Volume == dept.Volume && x.Id != dept.Id);
    }

    public async Task<int> AddRangeAsync(List<VideoBulletin> depts)
    {
        await _context.VideoBulletins.AddRangeAsync(depts);
        return await _context.SaveChangesAsync();
    }
}