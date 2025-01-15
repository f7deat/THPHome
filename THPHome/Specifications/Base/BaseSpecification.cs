using ApplicationCore.Interfaces;
using System.Linq.Expressions;

namespace THPHome.Specifications.Base;

public abstract class BaseSpecification<T>(Expression<Func<T, bool>> criteria) : ISpecification<T>
{
    public Expression<Func<T, bool>> Criteria { get; } = criteria;
    public List<Expression<Func<T, object>>> Includes { get; } = [];
    public List<string> IncludeStrings { get; } = [];
    public Expression<Func<T, object>> OrderBy { get; private set; } = default!;
    public Expression<Func<T, object>> OrderByDescending { get; private set; } = default!;
    public Expression<Func<T, object>> GroupBy { get; private set; } = default!;
    public Expression<Func<T, object>> FeildIsNull { get; private set; } = default!;

    public Expression<Func<T, object>> Where { get; private set; } = default!;
    public int Take { get; private set; }
    public int Skip { get; private set; }
    public bool isPagingEnabled { get; private set; } = false;

    protected virtual void AddInclude(Expression<Func<T, object>> includeExpression)
    {
        Includes.Add(includeExpression);
    }
    protected virtual void AddInclude(string includeString)
    {
        IncludeStrings.Add(includeString);
    }
    protected virtual void ApplyPaging(int skip, int take)
    {
        Skip = skip;
        Take = take;
        isPagingEnabled = true;
    }
    protected virtual void ApplyOrderBy(Expression<Func<T, object>> orderByExpression)
    {
        OrderBy = orderByExpression;
    }
    protected virtual void ApplyOrderByDescending(Expression<Func<T, object>> orderByDescendingExpression)
    {
        OrderByDescending = orderByDescendingExpression;
    }

    //Not used anywhere at the moment, but someone requested an example of setting this up.
    protected virtual void ApplyGroupBy(Expression<Func<T, object>> groupByExpression)
    {
        GroupBy = groupByExpression;
    }
    protected virtual void ApplyIsNull(Expression<Func<T, object>> isNullByExpression)
    {
        FeildIsNull = isNullByExpression;
    }
    protected virtual void ApplyWhere(Expression<Func<T, object>> whereByExpression)
    {
        Where = whereByExpression;
    }
}
