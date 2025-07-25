﻿using ApplicationCore.Helpers;
using ApplicationCore.Models.Posts;
using THPCore.Models;
using THPHome.Entities;
using THPHome.Enums;
using THPHome.Models.Categories;
using THPHome.Models.Filters;

namespace THPHome.Interfaces.IService;

public interface IPostService
{
    Task<IEnumerable<Post>> GetListAsync(PostType type);
    Task<PaginatedList<PostView>> GetListAsync(int current);
    Task<dynamic?> GetListAsync(PostFilterOptions filterOptions);
    Task<int> GetTotalViewAsync();
    Task<IEnumerable<Post>> GetTopViewAsync(int pageSize);
    Task<IEnumerable<PostView>> GetListInTagAsync(string tagName, int pageSize);
    Task<ListResult<dynamic>> GetInCategoryAsync(PostInCategoryFilterOptions filterOptions);
    Task<int> GetTotalAsync();
    Task<dynamic?> GetDataBarChartAsync();
    Task<byte[]> ExportAsync();
    Task<dynamic> ImportAsync(IFormFile file);
    Task<Post> AddAsync(Post post);
    Task<dynamic> SetStatusAsync(Post post);
    Task<THPResult> RemoveAsync(long id);
    Task<Post?> FindAsync(long id);
    Task<IEnumerable<PostView>> GetListRandomAsync(int pageSize, int categoryId = 0);
    Task<PaginatedList<PostView>> SearchAsync(string searchTerm, int? categoryId, int current, int pageSize);
    Task<List<CategoryWithPost>> GetListByAllCategoryAsync();
    Task<dynamic> EditAsync(Post post);
    Task<int> IncreaseViewAsync(Post post);
    Task<PaginatedList<PostView>> GetListInCategoryAsync(int categoryId, string searchTerm, int current);
    Task<int> GetCountInUserAsync(string id);
    Task<PaginatedList<PostView>> GetListInTagSync(string name, string searchTerm);
    Task<IEnumerable<PostView>> GetListByTypeAsync(PostType type, int current, int pageSize, string locale);
    Task<IEnumerable<PostView>> GetRandomPostsAsync();
    Task<IEnumerable<Post>> GetListPopularAsync();
    Task<IEnumerable<Post>> GetListByUserAsync(string id);
    Task<IEnumerable<PostView>> GetLastedListAsync(int pageSize);
    Task<IEnumerable<Post>> GetRelatedListAsync(string keyword, int pageSize);
    Task<IEnumerable<PostView>> GetListByCategoryAsync(string normalizeName, int current, int pageSize);
    Task<dynamic> SetActiveAsync(long id);
    Task<Post> EnsureDataAsync(string url, PostType pAGE, string locale);
    Task<ListResult<object>> GetTrashAsync(TrashedPostFilterOptions filterOptions);
    Task<THPResult> RestoreAsync(long id);
    Task<THPResult> DeleteAsync(long id);
    Task<int> GetCountInYearAsync(int year);
    Task<int> GetCountInMonthAsync(int month, int year);
}
