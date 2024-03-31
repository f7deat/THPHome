using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.Entities;

// This can easily be modified to be BaseEntity<T> and public T Id to support different key types.
// Using non-generic integer types for simplicity and to ease caching logic
public abstract class BaseEntity<T>
{
    [Key]
    public T Id { get; set; } = default!;
    public DateTime CreatedDate { get; set; }
    public DateTime ModifiedDate { get; set; }
    [StringLength(450)]
    public string? ModifiedBy { get; set; }
    [StringLength(450)]
    public string? CreatedBy { get; set; }
}
