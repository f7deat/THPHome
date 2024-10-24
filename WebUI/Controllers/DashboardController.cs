﻿using ApplicationCore.Constants;
using ApplicationCore.Interfaces.IService;
using Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using THPIdentity.Entities;
using WebUI.Foundations;

namespace WebUI.Controllers;

public class DashboardController : BaseController
{
    private readonly IPostService _postService;
    private readonly UserManager<ApplicationUser> _userManager;

    public DashboardController(IPostService postService, UserManager<ApplicationUser> userManager, ApplicationDbContext context) : base(context)
    {
        _postService = postService;
        _userManager = userManager;
    }

    [Route("get")]
    public IActionResult Index()
    {
        return Ok(true);
    }

    [Route("get-total-post")]
    public async Task<IActionResult> GetTotalPostAsync() => Ok(await _postService.GetTotalAsync());

    [HttpGet("total-user")]
    public async Task<IActionResult> TotalUser() => Ok(await _userManager.Users.CountAsync());

    [HttpGet("total-department")]
    public async Task<IActionResult> TotalDepartment() => Ok(await _context.Departments.CountAsync());
}
