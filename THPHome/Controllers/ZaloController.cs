using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using THPCore.Models;
using THPHome.Data;
using THPHome.ExternalAPI.Interfaces;
using THPHome.Foundations;
using ZaloSDK;
using ZaloSDK.Articles;

namespace THPHome.Controllers;

public class ZaloController(ApplicationDbContext context, IZaloAPI _zaloAPI) : BaseController(context)
{
    [HttpGet("articles"), AllowAnonymous]
    public async Task<IActionResult> GetArticlesAsync([FromQuery] FilterOptions filterOptions)
    {
        try
        {
            var accessToken = await _zaloAPI.GetAccessTokenAsync();
            if (string.IsNullOrEmpty(accessToken)) return BadRequest("Cannot get access token");
            var client = new ZaloClient(accessToken);
            return Ok(await client.GetSliceArticleAsync(filterOptions.Current, ArticleType.Normal, filterOptions.PageSize));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }

    [HttpGet("article/{id}"), AllowAnonymous]
    public async Task<IActionResult> GetArticleAsync([FromRoute] string id)
    {
        try
        {
            var accessToken = await _zaloAPI.GetAccessTokenAsync();
            if (string.IsNullOrEmpty(accessToken)) return BadRequest("Cannot get access token");
            var client = new ZaloClient(accessToken);
            return Ok(await client.GetArticleDetailAsync(id));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.ToString());
        }
    }
}
