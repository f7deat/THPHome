﻿using ApplicationCore.Helpers;
using ApplicationCore.Models.Filters;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using THPCore.Interfaces;
using WebUI.Constants;

namespace WebUI.Models.ViewModel;

public class ListResult<T> where T : class
{
    public IEnumerable<T> Data { get; set; } = new List<T>();
    public int Total { get; set; }
    public bool Succeeded { get; }
    private IFilterOptions FilterOptions { get; set; }
    public bool HasNextPage => Total > FilterOptions.Current * FilterOptions.PageSize;
    public bool HasPreviousPage => FilterOptions.Current > 1;
    public bool HasData => Data.Any();

    [UIHint(UIHint.Pagination)]
    public Pagination Pagination { get; set; } = new();

    public ListResult()
    {
        FilterOptions = new FilterOptions();
    }

    public ListResult(IEnumerable<T> data, int total, IFilterOptions filterOptions)
    {
        Data = data;
        Succeeded = true;
        Total = total;
        FilterOptions = filterOptions;
        Pagination = new Pagination
        {
            Current = filterOptions.Current,
            PageSize = filterOptions.PageSize,
            Total = total,
        };
    }

    public static async Task<ListResult<T>> Success(IQueryable<T> query, IFilterOptions filterOptions)
    {
        if (filterOptions.Current < 1) filterOptions.Current = 1;
        return new ListResult<T>(await query.AsNoTracking().Skip((filterOptions.Current - 1) * filterOptions.PageSize).Take(filterOptions.Current).ToListAsync(), await query.CountAsync(), filterOptions);
    }

    public static ListResult<T> Success(IEnumerable<T> query, IFilterOptions filterOptions)
    {
        return new ListResult<T>(query, query.Count(), filterOptions);
    }
}