using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

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
            await _partnerRepository.DeleteAsync(partner);
            return new
            {
                succeeded = true,
                data = partner,
                message = "Succeeded!"
            };
        }

        public Task<IReadOnlyList<Partner>> GetListAsync()
        {
            return _partnerRepository.ListAllAsync();
        }

        public async Task<dynamic> UpdateAsync(Partner partner)
        {
            partner.ModifiedDate = DateTime.Now;
            return new { 
                succeeded = true,
                data = await _partnerRepository.UpdateAsync(partner),
                message = "Succeeded!"
            };
        }
    }
}
