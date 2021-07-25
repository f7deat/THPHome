namespace ApplicationCore.Models
{
    public class Argument
    {
        public int? Id { get; set; }
        public string SearchTerm { get; set; }
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
