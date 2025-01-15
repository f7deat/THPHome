using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IService;
using THPHome.Interfaces.IRepository;

namespace THPHome.Services;

public class VideoService(IVideoRepository _videoRepository) : IVideoService
{
    public async Task<dynamic> AddAsync(Video video)
    {
        video.CreatedDate = DateTime.Now;
        return new
        {
            succeeded = true,
            message = "Succeeded",
            data = await _videoRepository.AddAsync(video)
        };
    }

    public async Task<dynamic> DeleteAsync(long id)
    {
        var video = await _videoRepository.FindAsync(id);
        if (video is null) return new { succeeded = false };
        await _videoRepository.DeleteAsync(video);
        return new
        {
            succeeded = true,
            data = video,
            message = "Succeeded"
        };
    }

    public Task<IReadOnlyList<Video>> GetListAsync(int pageSize)
    {
        return _videoRepository.GetListAsync(pageSize);
    }

    public async Task<dynamic> UpdateAsync(Video video)
    {
        return new { succeeded = true, data = await _videoRepository.UpdateAsync(video), message = "Succeeded!" };
    }
}
