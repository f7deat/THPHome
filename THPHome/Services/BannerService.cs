using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebUI.Models.Filters.Settings;
using WebUI.Models.ViewModel;

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

        public Task<ListResult<Banner>> GetListAsync(BannerFilterOptions filterOptions) => _bannerRepository.GetListAsync(filterOptions);

        public async Task<bool> UpdateAsync(Banner banner)
        {
            banner.ModifiedDate = DateTime.Now;
            await _bannerRepository.UpdateAsync(banner);
            return true;
        }
    }
}
