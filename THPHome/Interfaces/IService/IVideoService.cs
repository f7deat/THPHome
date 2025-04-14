using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using THPHome.Entities;

namespace ApplicationCore.Interfaces.IService
{
    public interface IVideoService
    {
        Task<IReadOnlyList<Video>> GetListAsync(int pageSize);
        Task<dynamic> AddAsync(Video video);
        Task<dynamic> UpdateAsync(Video video);
        Task<dynamic> DeleteAsync(long id);
    }
}
