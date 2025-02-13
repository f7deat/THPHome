namespace THPHome.Models.Results.QAs;

public class QaGroupListItem
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public List<QaCollapse>? Collapses { get; set; }
}

public class QaCollapse
{
    public Guid Key { get; set; }
    public string? Label { get; set; }
    public string? Children { get; set; }
}