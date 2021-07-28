using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ApplicationCore.Helpers
{
    public class PaginatedList<T> : List<T>
    {
        public int PageIndex { get; private set; }
        public int TotalPages { get; private set; }
        public int Total { get; private set; }

        public PaginatedList(List<T> items, int count, int pageIndex, int pageSize)
        {
            PageIndex = pageIndex;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            Total = count;
            AddRange(items);
        }

        public bool HasPreviousPage
        {
            get
            {
                return PageIndex > 1;
            }
        }

        public bool HasNextPage
        {
            get
            {
                return PageIndex < TotalPages;
            }
        }

        public static async Task<PaginatedList<T>> CreateAsync(IQueryable<T> source, int pageIndex, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PaginatedList<T>(items, count, pageIndex, pageSize);
        }

        public static PaginatedList<T> CreateAsync(List<T> source)
        {
            var count = source.Count();
            var items = source;
            return new PaginatedList<T>(items, count, 1, 10);
        }

    }

    public class Pagination
    {
        public int Current { get; set; }
        public int PageSize { get; set; }
        public int Total { get; set; }
    }

    public class Paginated<T>
    {
        public int TotalPages { get; private set; }
        public int Total { get; private set; }

        public Pagination Pagination { get; private set; } = new Pagination();
        public List<T> Data { get; private set; } = new List<T>();

        public Paginated(List<T> items, int count, int pageIndex, int pageSize)
        {
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            Total = count;

            Pagination.Current = pageIndex;
            Pagination.Total = Total;
            Pagination.PageSize = pageSize;
            Data.AddRange(items);
        }

        public bool HasPreviousPage
        {
            get
            {
                return Pagination.Current > 1;
            }
        }

        public bool HasNextPage
        {
            get
            {
                return Pagination.Current < TotalPages;
            }
        }

        public static async Task<Paginated<T>> CreateAsync(IQueryable<T> source, int pageIndex, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return new Paginated<T>(items, count, pageIndex, pageSize);
        }
    }
}
