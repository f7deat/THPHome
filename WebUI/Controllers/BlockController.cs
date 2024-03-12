using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WebUI.Api;
using WebUI.Entities;
using WebUI.Models.Blocks;

namespace WebUI.Controllers;

public class BlockController(ApplicationDbContext context) : BaseController(context)
{
    [HttpGet("options")]
    public async Task<IActionResult> OptionsAsync()
    {
        var query = await _context.Blocks.Where(x => x.Active)
            .OrderBy(x => x.Name)
            .Select(x => new
            {
                label = x.Name,
                value = x.Id
            }).ToListAsync();
        return Ok(query);
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddAsync([FromBody] PostBlock args)
    {
        args.Active = true;
        await _context.PostBlocks.AddAsync(args);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpGet("list/{postId}")]
    public async Task<IActionResult> ListAsync([FromRoute] long postId)
    {
        var query = from a in _context.Blocks
                    join b in _context.PostBlocks on a.Id equals b.BlockId
                    where b.PostId == postId
                    select new
                    {
                        b.BlockId,
                        b.PostId,
                        BlockName = a.Name,
                        a.NormalizedName,
                        b.SortOrder,
                        b.Name,
                        b.Active
                    };
        return Ok(new
        {
            data = await query.ToListAsync(),
            total = await query.CountAsync()
        });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAsync([FromRoute] Guid id)
    {
        var work = await _context.PostBlocks.FindAsync(id);
        if (work is null) return BadRequest();
        var block = await _context.Blocks.FindAsync(work.BlockId);
        if (block is null) return BadRequest();
        if (string.IsNullOrEmpty(work.Data)) return Ok();
        switch (block.NormalizedName)
        {
            case "Text": return Ok(JsonConvert.DeserializeObject<TextBlock>(work.Data));
            default:
                break;
        }
        return Ok();
    }
}
