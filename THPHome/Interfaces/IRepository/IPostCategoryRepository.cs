using ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using THPHome.Interfaces.Base;

namespace ApplicationCore.Interfaces.IRepository
{
    public interface IPostCategoryRepository : IAsyncRepository<PostCategory>
    {
        Task<List<PostCategory>> GetListInPostAsync(long id);
        Task RemoveRangeAsync(List<PostCategory> postCategories);
        Task<int[]> GetListCategoryIdInPostAsync(long postId);
    }
}
