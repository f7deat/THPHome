using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities.Users;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Models.ComponentModel;
using THPHome.Models.Filters.Users;
using THPHome.Repositories.Base;

namespace THPHome.Repositories.Users;

public class CityRepository(ApplicationDbContext context) : EfRepository<City>(context), ICityRepository
{
    public async Task<IEnumerable<SelectOption>> GetOptionsAsync(CitySelect select)
    {
        var query = from a in _context.Cities
                    select a;
        if (!string.IsNullOrWhiteSpace(select.KeyWords))
        {
            query = query.Where(x => x.Name.ToLower().Contains(select.KeyWords.ToLower()));
        }
        if (select.CountryId != null)
        {
            query = query.Where(x => x.CountryId == select.CountryId);
        }
        return await _context.Cities.Select(x => new SelectOption
        {
            Value = x.Id,
            Label = x.Name
        }).ToListAsync();
    }
}
