namespace ApplicationCore.Entities
{
    public class Partner : BaseEntity<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Logo { get; set; }
        public int Status { get; set; }
        public string Url { get; set; }
        public int Index { get; set; }
    }
}
