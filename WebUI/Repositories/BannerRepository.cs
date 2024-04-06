﻿using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class BannerRepository : EfRepository<Banner>, IBannerRepository
    {
        public BannerRepository(ApplicationDbContext context) : base(context)
        {

        }

        public async Task<IReadOnlyList<Banner>> GetListAsync(BannerType? type, int pageSize)
        {
            if (type == null || type == BannerType.DEFAULT)
            {
                return await _context.Banners.OrderByDescending(x => x.Id).Take(pageSize).ToListAsync();
            }
            return await _context.Banners.Where(x => x.Type == type).OrderByDescending(x => x.Id).Take(pageSize).ToListAsync();
        }

        public async Task RemoveRangeAsync(long id)
        {
            var banners = await _context.Banners.Where(x => x.PostId == id).ToListAsync();
            if (!banners.IsNullOrEmpty())
            {
                _context.RemoveRange(banners);
                await _context.SaveChangesAsync();
            }
        }
    }
}
