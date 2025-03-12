using ApplicationCore.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using THPCore.Extensions;
using THPHome.Data;
using THPHome.Entities;
using THPHome.Enums;
using THPHome.Models.Blocks;
using THPIdentity.Entities;
using WebUI.Entities;
using WebUI.Foundations;
using WebUI.Models.Blocks;

namespace THPHome.Controllers;

public class BlockController(ApplicationDbContext context, UserManager<ApplicationUser> userManager) : BaseController(context)
{
    private readonly UserManager<ApplicationUser> _userManager = userManager;

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
        var lastOrder = await _context.PostBlocks.MaxAsync(x => x.SortOrder);
        args.SortOrder = lastOrder + 1;
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
                    orderby b.SortOrder ascending
                    select new
                    {
                        b.Id,
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

    [HttpGet("{id}"), AllowAnonymous]
    public async Task<IActionResult> GetAsync([FromRoute] Guid id)
    {
        var work = await _context.PostBlocks.FindAsync(id);
        if (work is null) return BadRequest();
        var block = await _context.Blocks.FindAsync(work.BlockId);
        if (block is null) return BadRequest();
        object? data = new { };
        if (!string.IsNullOrWhiteSpace(work.Data))
        {
            switch (block.NormalizedName)
            {
                case nameof(DividerBlock):
                    {
                        data = JsonConvert.DeserializeObject<DividerBlock>(work.Data);
                        break;
                    }
                case nameof(HtmlBlock):
                    {
                        data = JsonConvert.DeserializeObject<HtmlBlock>(work.Data);
                        break;
                    };
                case nameof(MajorGeneralBlock):
                    {
                        data = JsonConvert.DeserializeObject<MajorGeneralBlock>(work.Data);
                        break;
                    };
                case nameof(TextBlock):
                    {
                        data = JsonConvert.DeserializeObject<TextBlock>(work.Data);
                        break;
                    };
                case nameof(TinyMCEBlock):
                    {
                        data = JsonConvert.DeserializeObject<TinyMCEBlock>(work.Data);
                        break;
                    };
                case nameof(VideoBlock):
                    {
                        data = JsonConvert.DeserializeObject<VideoBlock>(work.Data);
                        break;
                    };
                case nameof(SponsorBlock):
                    {
                        data = JsonConvert.DeserializeObject<SponsorBlock>(work.Data);
                        break;
                    };
                case nameof(SideGalleryBlock):
                    {
                        data = JsonConvert.DeserializeObject<SideGalleryBlock>(work.Data);
                        break;
                    };
                case nameof(BannerBlock):
                    {
                        data = JsonConvert.DeserializeObject<BannerBlock>(work.Data);
                        break;
                    };
                case nameof(PopupBlock):
                    {
                        data = JsonConvert.DeserializeObject<PopupBlock>(work.Data);
                        break;
                    };
                case nameof(SloganBlock):
                    {
                        data = JsonConvert.DeserializeObject<SloganBlock>(work.Data);
                        break;
                    };
                default:
                    break;
            }
        }
        return Ok(new
        {
            work.Id,
            work.BlockId,
            block.NormalizedName,
            block.Name,
            block.Active,
            data,
        });
    }

    [HttpPost("save/{id}")]
    public async Task<IActionResult> SaveAsync([FromRoute] Guid id, [FromBody] object data)
    {
        try
        {
            var work = await _context.PostBlocks.FindAsync(id);
            if (work is null) return BadRequest("Work not found!");
            work.Data = data.ToString();
            _context.PostBlocks.Update(work);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }

    [HttpPost("delete/{id}")]
    public async Task<IActionResult> DeleteAsync([FromRoute] Guid id)
    {
        var work = await _context.PostBlocks.FindAsync(id);
        if (work is null) return BadRequest();
        _context.Remove(work);
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
    }

    [HttpPost("sort-order")]
    public async Task<IActionResult> SortOrderAsync([FromBody] List<Block> blocks)
    {
        var i = 0;
        foreach (var item in blocks)
        {
            var block = await _context.PostBlocks.FindAsync(item.Id);
            if (block is null) continue;
            block.SortOrder = i;
            i++;
        }
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
    }

    [HttpPost("copy")]
    public async Task<IActionResult> CopyAsync([FromBody] Post args)
    {
        try
        {
            var source = await _context.Posts.FindAsync(args.Id);
            if (source is null) return BadRequest("Source not found!");
            if (string.IsNullOrWhiteSpace(args.Title)) return BadRequest("Please input title!");
            var user = await _userManager.FindByIdAsync(User.GetId());

            var url = SeoHelper.ToSeoFriendly(args.Title);
            if (await _context.Posts.AnyAsync(x => x.Url == url)) return BadRequest("Title already exists!");

            var target = new Post
            {
                Title = args.Title,
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now,
                Status = PostStatus.DRAFT,
                Type = source.Type,
                Description = args.Description,
                Thumbnail = args.Thumbnail,
                Url = url,
                View = 0,
                CreatedBy = user?.Id,
                Locale = source.Locale,
                CategoryId = source.CategoryId,
                IssuedDate = DateTime.Now,
                Language = source.Language
            };
            await _context.Posts.AddAsync(target);
            await _context.SaveChangesAsync();
            var blocks = await _context.PostBlocks.Where(x => x.PostId == source.Id).ToListAsync();
            foreach (var item in blocks)
            {
                item.Id = Guid.NewGuid();
                item.PostId = target.Id;
                await _context.PostBlocks.AddAsync(item);
            }

            var categories = await _context.PostCategories.Where(x => x.PostId == source.Id).ToListAsync();
            foreach (var item in categories)
            {
                item.PostId = target.Id;
                await _context.PostCategories.AddAsync(item);
            }

            await _context.SaveChangesAsync();

            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }

    [HttpPost("save-info")]
    public async Task<IActionResult> SaveInfoAsync([FromBody] PostBlock args)
    {
        var block = await _context.PostBlocks.FindAsync(args.Id);
        if (block is null)
        {
            return BadRequest("Data not found!");
        }
        block.Name = args.Name;
        block.BlockId = args.BlockId;
        _context.Update(block);
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
    }

    [HttpPost("active/{id}")]
    public async Task<IActionResult> ActiveAsync([FromRoute] Guid id)
    {
        var block = await _context.PostBlocks.FindAsync(id);
        if (block is null)
        {
            return BadRequest("Data not found!");
        }
        block.Active = !block.Active;
        _context.Update(block);
        await _context.SaveChangesAsync();
        return Ok(IdentityResult.Success);
    }
}
