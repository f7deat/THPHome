using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace THPHome.Entities.Users;

public class BookAuthor
{
    [StringLength(256)]
    public string UserId { get; set; } = default!;
    [ForeignKey(nameof(Book))]
    public Guid BookId { get; set; }

    public Book? Book { get; set; }
}
