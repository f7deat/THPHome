using ApplicationCore.Interfaces.IRepository;
using Microsoft.AspNetCore.Identity;
using THPCore.Models;
using THPHome.Entities;
using THPHome.Interfaces.IService;
using THPHome.Models.Filters.Parners;

namespace THPHome.Services;

public class PartnerService(IPartnerRepository _partnerRepository) : IPartnerService
{
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
