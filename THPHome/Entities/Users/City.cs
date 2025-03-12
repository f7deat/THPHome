using System.ComponentModel.DataAnnotations.Schema;
using THPCore.Infrastructures;

namespace THPHome.Entities.Users;

public class City : BaseEntity<int>
{
    public string Name { get; set; } = default!;
    [ForeignKey(nameof(Country))]
    public int CountryId { get; set; }

    public Country? Country { get; set; }
}
