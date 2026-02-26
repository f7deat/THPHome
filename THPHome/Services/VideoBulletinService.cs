using THPCore.Models;
using THPHome.Entities;
using THPHome.Interfaces.IRepository.IUsers;
using THPHome.Interfaces.IService.IUsers;
using THPHome.Interfaces.IService;
using THPHome.Models.Args.VideoBulletin;
using THPHome.Interfaces.IRepository;
using THPHome.Repositories;
using THPHome.Models.Filters.VideoBulletin;
using THPCore.Interfaces;

namespace THPHome.Services;
public class VideoBulletinService(IVideoBulletinRepository _videoBulletinRepository, ILogService _logService, IHCAService _hCAService) : IVideoBulletinService
{
    public Task<ListResult<object>> ListAsync(VideoBulletinFilterOptions filterOptions) => _videoBulletinRepository.ListAsync(filterOptions);
    public async Task<THPResult> CreateAsync(VideoBulletinCreateArgs videoBulletin)
    {
        var exist = await _videoBulletinRepository.ExistCreateDataAsync(videoBulletin);
        if (exist) return THPResult.Failed("Tên đơn vị đã tồn tại");
        await _videoBulletinRepository.AddAsync(new VideoBulletin
        {
            Volume = videoBulletin.Volume,
            YoutubeId = videoBulletin.YoutubeId,
            CreatedBy = _hCAService.GetUserId(),
            CreatedDate = DateTime.Now,
        });
        return THPResult.Success;
    }

    public async Task<THPResult> UpdateAsync(VideoBulletinUpdateArgs args)
    {
        var data = await _videoBulletinRepository.FindAsync(args.Id);
        if (data is null) return THPResult.Failed("Không tìm thấy đơn vị");
        data.Volume = args.Volume;
        data.YoutubeId = args.YoutubeId;
        data.ModifiedDate = DateTime.Now;
        data.ModifiedBy = _hCAService.GetUserId();
        var exist = await _videoBulletinRepository.ExistUpdateDataAsync(args);
        if (exist) return THPResult.Failed("Tên đơn vị đã tồn tại");
        await _videoBulletinRepository.UpdateAsync(data);
        return THPResult.Success;
    }

    public async Task<THPResult> DeleteAsync(int id)
    {
        var videoBulletin = await _videoBulletinRepository.FindAsync(id);
        if (videoBulletin is null) return THPResult.Failed("Không tìm thấy thông tin đơn vị");
        await _logService.AddAsync($"Xóa đơn vị");
        await _videoBulletinRepository.DeleteAsync(videoBulletin);
        return THPResult.Success;
    }
}