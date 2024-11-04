using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ApplicationCore.Helpers
{
    public class PaginatedList<T> : List<T>
    {
        public int Current { get; private set; }
        public int TotalPages { get; private set; }
        public int Total { get; private set; }

        public PaginatedList(List<T> items, int count, int current, int pageSize)
        {
            Current = current;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            Total = count;
            AddRange(items);
        }

        public bool HasPreviousPage
        {
            get
            {
                return Current > 1;
            }
        }

        public bool HasNextPage
        {
            get
            {
                return Current < TotalPages;
            }
        }

        public static async Task<PaginatedList<T>> CreateAsync(IQueryable<T> source, int current, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((current - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PaginatedList<T>(items, count, current, pageSize);
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
        public List<T> Data { get; private set; } = [];

        public Paginated(List<T> items, int count, int current, int pageSize)
        {
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            Total = count;

            Pagination.Current = current;
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

        public static async Task<Paginated<T>> CreateAsync(IQueryable<T> source, int current, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((current - 1) * pageSize).Take(pageSize).ToListAsync();
            return new Paginated<T>(items, count, current, pageSize);
        }
    }
}
