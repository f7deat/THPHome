using System;

namespace ApplicationCore.Models.Posts
{
    public class PostView
    {
        private string url;

        public long Id { get; set; }
        public string Title { get; set; }
        public string Url { get => $"/post/{url}-{Id}.html"; set => url = value; }
        public string Thumbnail { get; set; }
        public int View { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string Description { get; set; }
        public string CategoryName { get; set; }
        public int CategoryId { get; set; }
    }
}
