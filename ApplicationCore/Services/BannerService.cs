using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class BannerService : IBannerService
    {
        private readonly IBannerRepository _bannerRepository;
        public BannerService(IBannerRepository bannerRepository)
        {
            _bannerRepository = bannerRepository;
        }

        public Task<Banner> AddAsync(Banner banner)
        {
            banner.CreatedDate = DateTime.Now;
            banner.ModifiedDate = DateTime.Now;
            banner.Status = BannerStatus.ACTIVE;
            return _bannerRepository.AddAsync(banner);
        }

        public async Task<dynamic> DeleteAsync(int id)
        {
            var banner = await _bannerRepository.GetByIdAsync(id);
            await _bannerRepository.DeleteAsync(banner);
            return new { succeeded = true };
        }

        public Task<IReadOnlyList<Banner>> GetListAsync(BannerType? type) => _bannerRepository.GetListAsync(type);

        public Task<IEnumerable<Banner>> GetListAsync(long id) => _bannerRepository.GetListAsync(id);

        public async Task<bool> UpdateAsync(Banner banner)
        {
            banner.ModifiedDate = DateTime.Now;
            await _bannerRepository.UpdateAsync(banner);
            return true;
        }
    }
}
