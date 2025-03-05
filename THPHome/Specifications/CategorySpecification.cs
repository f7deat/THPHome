using THPHome.Entities;
using THPHome.Specifications.Base;

namespace ApplicationCore.Specifications
{
    public class CategorySpecification : BaseSpecification<Category>
    {
        public CategorySpecification()
            : base(b => b.ParentId == null)
        {
            ApplyIsNull(b => b.ParentId == null);
        }
        //public CategorySpecification(int? id) : base(b => b.CategoryType == id)
        //{
        //    ApplyWhere(c => c.CategoryType == id);
        //}
    }
}
