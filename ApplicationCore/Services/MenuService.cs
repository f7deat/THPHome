using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class MenuService : IMenuService
    {
        private readonly IMenuRepository _menuRepository;
        public MenuService(IMenuRepository menuRepository)
        {
            _menuRepository = menuRepository;
        }

        public async Task<object> AddAsync(Menu menu)
        {
            return new
            {
                succeeded = true,
                data = await _menuRepository.AddAsync(menu),
                message = "Thành công!"
            };
        }

        public async Task<object> DeleteAsyn(int id)
        {
            var menu = await _menuRepository.GetByIdAsync(id);
            await _menuRepository.DeleteAsync(menu);
            return new
            {
                succeeded = true,
                data = menu,
                message = "Thành công!"
            };
        }

        public Task<IReadOnlyList<Menu>> GetListAsync(MenuType type = MenuType.DEFAULT) => _menuRepository.GetListAsync(type);

        public Task<IEnumerable<Menu>> GetListParrentAsync(MenuType? type) => _menuRepository.GetListParrentAsync(type);

        public async Task<object> UpdateAsync(Menu menu)
        {
            return new
            {
                succeeded = true,
                data = await _menuRepository.UpdateAsync(menu),
                message = "Thành công!"
            };
        }
    }
}
