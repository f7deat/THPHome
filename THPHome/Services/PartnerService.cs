using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using Microsoft.AspNetCore.Identity;
using THPHome.Entities;
using WebUI.Models.Filters.Parners;
using WebUI.Models.ViewModel;

namespace ApplicationCore.Services
{
    public class PartnerService : IPartnerService
    {
        private readonly IPartnerRepository _partnerRepository;
        public PartnerService(IPartnerRepository partnerRepository)
        {
            _partnerRepository = partnerRepository;
        }

        public async Task<dynamic> AddAsync(Partner partner)
        {
            partner.CreatedDate = DateTime.Now;
            partner.ModifiedDate = DateTime.Now;
            return new
            {
                succeeded = true,
                data = await _partnerRepository.AddAsync(partner),
                message = "Succeeded!"
            };
        }

        public async Task<dynamic> DeleteAsync(int id)
        {
            var partner = await _partnerRepository.GetByIdAsync(id);
            if (partner == null) return IdentityResult.Failed(new IdentityError
            {
                Code = "B",
                Description = "Partner not found!"
            });
            await _partnerRepository.DeleteAsync(partner);
            return IdentityResult.Success;
        }

        public Task<ListResult<Partner>> GetListAsync(PartnerFilterOptions filterOptions) => _partnerRepository.GetListAsync(filterOptions);
    }
}
