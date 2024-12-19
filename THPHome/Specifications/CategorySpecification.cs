using ApplicationCore.Specifications.Base;
using THPHome.Entities;

namespace ApplicationCore.Specifications
{
    public class CategorySpecification : BaseSpecification<Category>
    {
        public CategorySpecification()
            : base(b => b.ParrentId == null)
        {
            ApplyIsNull(b => b.ParrentId == null);
        }
        //public CategorySpecification(int? id) : base(b => b.CategoryType == id)
        //{
        //    ApplyWhere(c => c.CategoryType == id);
        //}
    }
}
