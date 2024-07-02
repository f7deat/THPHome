namespace WebUI.Foundations.Interfaces;

public interface IBaseEntity
{
    DateTime CreatedDate { get; set; }
    DateTime ModifiedDate { get; set; }
    string? CreatedBy { get; set; }
    string? ModifiedBy { get; set; }
}
