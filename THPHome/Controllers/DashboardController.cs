﻿using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Foundations;
using THPHome.Interfaces.IService;
using THPIdentity.Entities;

namespace THPHome.Controllers;

public class DashboardController(IPostService _postService, UserManager<ApplicationUser> _userManager, ApplicationDbContext context) : BaseController(context)
{
    [Route("get-total-post")]
    public async Task<IActionResult> GetTotalPostAsync() => Ok(await _postService.GetTotalAsync());

    [HttpGet("total-user")]
    public async Task<IActionResult> TotalUser() => Ok(await _userManager.Users.CountAsync());
}
