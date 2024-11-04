using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;

namespace ApplicationCore.Services;

public class PostCategoryService : IPostCategoryService
{
    private readonly IPostCategoryRepository _postCategoryRepository;
    public PostCategoryService(IPostCategoryRepository postCategoryRepository)
    {
        _postCategoryRepository = postCategoryRepository;
    }

    public async Task AddAsync(int[]? listCategoryId, long postId)
    {
        if (listCategoryId is null) return;

        foreach (var categoryId in listCategoryId)
        {
            await _postCategoryRepository.AddAsync(new PostCategory
            {
                CategoryId = categoryId,
                PostId = postId
            });
        }
    }

    public async Task DeleteAsync(long postId)
    {
        var postCategories = await _postCategoryRepository.GetListInPostAsync(postId);
        await _postCategoryRepository.RemoveRangeAsync(postCategories);
    }

    public Task<int[]> GetListCategoryIdInPostAsync(long postId) => _postCategoryRepository.GetListCategoryIdInPostAsync(postId);
}
