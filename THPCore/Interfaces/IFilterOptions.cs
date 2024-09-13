namespace THPCore.Interfaces;

public interface IFilterOptions
{
    int Current { get; set; }
    int PageIndex { get; set; }
    int PageSize { get; set; }
}
