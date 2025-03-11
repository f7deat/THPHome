namespace THPHome.Models.Args.Users;

public class UpdateUserArgs
{
    public string Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? Bio { get; set; }
    public string? Website { get; set; }
    public string? Facebook { get; set; }
    public string? Linkedin { get; set; }
    public string? Address { get; set; }
    public string? Position { get; set; }
    public string? CurrentResidence { get; set; }
    public int? AcademicTitleId { get; set; }
    public int? AcademicDegreeId { get; set; }
    public string? IdentityNumber { get; set; }
    public DateTime? IdentityDate { get; set; }
    public string? IdentityPlace { get; set; }
    public int? CityId { get; set; }
    public bool? Gender { get; set; }
}
