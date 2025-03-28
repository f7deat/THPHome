namespace THPHome.Models.Results.Charts;

public class ColumnChart
{
    public IEnumerable<int> Series { get; set; } = [];
    public IEnumerable<string> XAxis { get; set; } = [];
}
