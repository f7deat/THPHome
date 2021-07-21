using System;

namespace WebUI.Models
{
    [Serializable]
    public class TagModel
    {
        public int TagId { get; set; }
        public int ThreadId { get; set; }
        public string Name { get; set; }
    }
}
