namespace THPCore.Interfaces;

public interface IBaseEntity<T>
{
    T Id { get; set; }
}

public interface IBaseEntity
{
    Guid Id { get; set; }
}