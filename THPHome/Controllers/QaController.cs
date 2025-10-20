using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Data;
using THPHome.Entities.QA;
using THPHome.Foundations;
using THPHome.Interfaces.IService;
using THPHome.Models.Results.QAs;
using THPIdentity.Entities;

namespace THPHome.Controllers;

public class QaController(ApplicationDbContext context, UserManager<ApplicationUser> _userManager, ILogService _logService, IHCAService _hcaService) : BaseController(context)
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetAsync([FromRoute] Guid id) => Ok(new { data = await _context.QaGroups.FindAsync(id) });

    [HttpGet("list")]
    public async Task<IActionResult> ListAsync([FromQuery] FilterOptions filterOptions)
    {
        var query = _context.QaGroups.OrderBy(x => x.SortOrder);
        return Ok(await ListResult<QaGroup>.Success(query, filterOptions));
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateAsync([FromBody] QaGroup args)
    {
        var data = await _context.QaGroups.FindAsync(args.Id);
        if (data == null) return BadRequest("Data not found!");
        data.Title = args.Title;
        data.ModifiedDate = DateTime.Now;
        data.ModifiedBy = _hcaService.GetUserId();
        data.SortOrder = args.SortOrder;
        _context.QaGroups.Update(data);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("group/active")]
    public async Task<IActionResult> ActiveGroupAsync([FromBody] QaGroup args)
    {
        var group = await _context.QaGroups.FindAsync(args.Id);
        if (group is null) return BadRequest("Data not found!");
        group.Active = !group.Active;
        group.ModifiedDate = DateTime.Now;
        _context.QaGroups.Update(group);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddAsync([FromBody] QaGroup args, [FromQuery] string locale)
    {
        args.CreatedDate = DateTime.Now;
        args.CreatedBy = _hcaService.GetUserId();
        args.ModifiedDate = DateTime.Now;
        args.Active = true;
        args.Locale = locale;
        await _context.QaGroups.AddAsync(args);
        await _context.SaveChangesAsync();
        return Created();
    }

    [HttpPost("delete/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] Guid id)
    {
        var data = await _context.QaGroups.FindAsync(id);
        if (data == null) return BadRequest("Data not found!");
        if (await _context.QaItems.AnyAsync(x => x.QaGroupId == data.Id))
        {
            var items = await _context.QaItems.Where(x => x.QaGroupId == id).ToListAsync();
            _context.QaItems.RemoveRange(items);
        }
        _context.QaGroups.Remove(data);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("item/list/{id}")]
    public async Task<IActionResult> ItemListAsync([FromRoute] Guid id, [FromQuery] FilterOptions filterOptions)
    {
        var query = _context.QaItems.Where(x => x.QaGroupId == id);
        query = query.OrderByDescending(x => x.SortOrder);
        var data = await query.Select(x => new QaItemListResult
        {
            Id = x.Id,
            Question = x.Question,
            Answer = x.Answer,
            SortOrder = x.SortOrder,
            CreatedDate = x.CreatedDate,
            CreatedBy = x.CreatedBy,
            ModifiedDate = x.ModifiedDate,
            ModifiedBy = x.ModifiedBy
        }).AsNoTracking().ToListAsync();

        var users = await _userManager.Users.Where(x => x.UserType != UserType.Student).AsNoTracking().ToListAsync();

        return Ok(new
        {
            Data = data.Select(x =>
            {
                var createdBy = users.FirstOrDefault(u => u.Id == x.CreatedBy);
                var modifiedBy = users.FirstOrDefault(u => u.Id == x.ModifiedBy);
                if (createdBy != null)
                {
                    x.CreatedBy = createdBy.Name;
                }
                if (modifiedBy != null)
                {
                    x.ModifiedBy = modifiedBy.Name;
                }
                return x;
            }),
            Total = await query.CountAsync()
        });
    }

    [HttpPost("item/update")]
    public async Task<IActionResult> ItemUpdateAsync([FromBody] QaItem args)
    {
        try
        {
            var data = await _context.QaItems.FindAsync(args.Id);
            if (data == null) return BadRequest("Data not found!");
            data.Answer = args.Answer;
            data.Question = args.Question;
            data.SortOrder = args.SortOrder;
            data.ModifiedDate = DateTime.Now;
            data.ModifiedBy = _hcaService.GetUserId();
            _context.QaItems.Update(data);
            await _logService.AddAsync($"Update QaItem: {data.Question} -> {args.Question}. {data.Answer} -> {args.Answer}");
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            await _logService.ExeptionAsync(ex);
            return BadRequest(ex.ToString());
        }
    }

    [HttpPost("item/add")]
    public async Task<IActionResult> ItemAddAsync([FromBody] QaItem args)
    {
        args.CreatedDate = DateTime.Now;
        args.CreatedBy = _hcaService.GetUserId();
        args.ModifiedDate = DateTime.Now;
        await _context.QaItems.AddAsync(args);
        await _context.SaveChangesAsync();
        return Created();
    }

    [HttpPost("item/delete/{id}")]
    public async Task<IActionResult> ItemDeleteAsync([FromRoute] Guid id)
    {
        var data = await _context.QaItems.FindAsync(id);
        if (data == null) return BadRequest("Data not found!");
        _context.QaItems.Remove(data);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("all"), AllowAnonymous]
    public async Task<IActionResult> AllQaAsync()
    {
        var data = new List<QaGroupListItem>();
        var groups = await _context.QaGroups.Where(x => x.Active).OrderBy(x => x.SortOrder).AsNoTracking().ToListAsync();
        var items = await _context.QaItems.OrderBy(x => x.SortOrder).AsNoTracking().ToListAsync();
        foreach (var group in groups)
        {
            var collapse = new QaGroupListItem
            {
                Id = group.Id,
                Title = group.Title,
                Collapses = [.. items.Where(x => x.QaGroupId == group.Id).Select(x => new QaCollapse
                {
                    Key = x.Id,
                    Label = x.Question,
                    Children = x.Answer
                })]
            };
            data.Add(collapse);
        }
        return Ok(data);
    }
}
