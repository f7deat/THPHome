using ApplicationCore.Models.Filters;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebUI.Api;
using WebUI.Entities;
using WebUI.Extensions;
using WebUI.Models.ViewModel;

namespace WebUI.Controllers;

public class QaController : BaseController
{
    public QaController(ApplicationDbContext context) : base(context)
    {
    }

    [HttpGet("list")]
    public async Task<IActionResult> ListAsync([FromQuery] FilterOptions filterOptions)
    {
        var query = _context.QaGroups.OrderByDescending(x => x.SortOrder);
        return Ok(await ListResult<QaGroup>.Success(query, filterOptions));
    }

    [HttpPost("update")]
    public async Task<IActionResult> UpdateAsync([FromBody] QaGroup args)
    {
        var data = await _context.QaGroups.FindAsync(args.Id);
        if (data == null) return BadRequest("Data not found!");
        data.Title = args.Title;
        data.ModifiedDate = DateTime.Now;
        data.ModifiedBy = User.GetId();
        data.SortOrder = args.SortOrder;
        _context.QaGroups.Update(data);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddAsync([FromBody] QaGroup args)
    {
        args.CreatedDate = DateTime.Now;
        args.CreatedBy = User.GetId();
        args.ModifiedDate = DateTime.Now;
        args.Active = true;
        args.Language = ApplicationCore.Enums.Language.VI;
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
        return Ok(await ListResult<QaItem>.Success(query, filterOptions));
    }

    [HttpPost("item/update")]
    public async Task<IActionResult> ItemUpdateAsync([FromBody] QaItem args)
    {
        var data = await _context.QaItems.FindAsync(args.Id);
        if (data == null) return BadRequest("Data not found!");
        data.Answer = args.Answer;
        data.Question = args.Question;
        data.SortOrder = args.SortOrder;
        data.ModifiedDate = DateTime.Now;
        data.ModifiedBy = User.GetId();
        _context.QaItems.Update(data);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("item/add")]
    public async Task<IActionResult> ItemAddAsync([FromBody] QaItem args)
    {
        args.CreatedDate = DateTime.Now;
        args.CreatedBy = User.GetId();
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
}
