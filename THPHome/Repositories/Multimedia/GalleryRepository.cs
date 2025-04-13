using THPHome.Data;
using THPHome.Entities;
using THPHome.Interfaces.IRepository.IMultimedia;
using THPHome.Repositories.Base;

namespace THPHome.Repositories.Multimedia;

public class GalleryRepository(ApplicationDbContext context) : EfRepository<Gallery>(context), IGalleryRepository
{
}
