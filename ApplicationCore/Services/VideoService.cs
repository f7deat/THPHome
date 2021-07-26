using ApplicationCore.Entities;
using ApplicationCore.Interfaces.IRepository;
using ApplicationCore.Interfaces.IService;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class VideoService : IVideoService
    {
        private readonly IVideoRepository _videoRepository;
        public VideoService(IVideoRepository videoRepository)
        {
            _videoRepository = videoRepository;
        }
        public async Task<dynamic> AddAsync(Video video)
        {
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
}
