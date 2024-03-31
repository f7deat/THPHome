namespace ApplicationCore.Models.Filters;

public interface IFilterOptions
{
    int PageIndex { get; set; }
    int PageSize { get; set; }
}

public class FilterOptions : IFilterOptions
{
    public int PageIndex { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}
