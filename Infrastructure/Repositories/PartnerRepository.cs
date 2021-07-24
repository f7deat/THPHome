using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Repositories
{
    public class PartnerRepository : EfRepository<Partner>, IPartnerRepository
    {
        public PartnerRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
