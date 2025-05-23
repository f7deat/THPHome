﻿using ApplicationCore.Helpers;
using ApplicationCore.Models.Posts;
using Microsoft.AspNetCore.Mvc;
using THPHome.Foundations;
using THPHome.Interfaces.IService;

namespace WebUI.Pages.Search;

public class IndexModel : EntryPageModel
{

    public IEnumerable<PostView> RandomPosts = [];
    private readonly ICategoryService _categoryService;
    public PaginatedList<PostView>? Posts;

    public IndexModel(IPostService postService, ICategoryService categoryService) : base(postService)
    {
        _categoryService = categoryService;
    }

    [BindProperty(SupportsGet = true)]
    public string SearchTerm { get; set; } = string.Empty;
    public int Current { get; set; } = 1;
    public int? CategoryId { get; set; }

    public async Task<IActionResult> OnGetAsync()
    {
        RandomPosts = await _postService.GetRandomPostsAsync();

        Request.Cookies.TryGetValue("locale", out string? locale);
        if (string.IsNullOrEmpty(SearchTerm))
        {
            return Page();
        }
        Posts = await _postService.SearchAsync(SearchTerm.ToLower(), CategoryId, Current, 10);
        return Page();
    }
}
