using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using THPCore.Models;
using THPHome.Data;
using THPHome.Entities.Leaves;
using THPHome.Interfaces.IRepository.ILeaves;
using THPHome.Models.Filters.Leaves;
using THPHome.Models.Results.Charts;
using THPHome.Models.Results.Leaves;
using THPHome.Repositories.Base;
using THPHome.Services.Leaves.Filters;
using THPHome.Services.Leaves.Results;
using THPIdentity.Entities;

namespace THPHome.Repositories.Leaves;

public class LeaveRequestRepository(ApplicationDbContext context, UserManager<ApplicationUser> _userManager) : EfRepository<LeaveRequest>(context), ILeaveRequestRepository
{
    public async Task<object?> GetCountByDepartmentAsync(DateTime fromDate, DateTime toDate)
    {
        var query = from a in _context.LeaveRequests
                    join b in _context.Departments on a.DepartmentId equals b.Code
                    where a.StartDate.Date >= fromDate.Date && a.StartDate.Date <= toDate.Date
                    group new { b.Name, a.Status } by new { b.Name, b.Id }  into g
                    select new
                    {
                        DepartmentName = g.Key.Name,
                        DepartmentId = g.Key.Id,
                        Count = g.Count(),
                        Pending = g.Count(x => x.Status == LeaveStatus.Pending),
                        Approved = g.Count(x => x.Status == LeaveStatus.Approved),
                        Rejected = g.Count(x => x.Status == LeaveStatus.Rejected)
                    };
        return new { data = await query.ToListAsync(), total = await query.CountAsync() };
    }

    public async Task<ColumnChart> CountAllByDepartmentAsync(DateTime fromDate, DateTime toDate)
    {
        var query = from a in _context.LeaveRequests
                    join b in _context.Departments on a.DepartmentId equals b.Code
                    where a.StartDate <= toDate && a.StartDate >= fromDate && a.Status == LeaveStatus.Approved
                    group b by b.Name into g
                    select new 
                    {
                        DepartmentName = g.Key,
                        Total = g.Count()
                    };
        var data = await query.Where(x => x.Total >  0).ToListAsync();
        return new ColumnChart
        {
            XAxis = data.Select(x => x.DepartmentName),
            Series = data.Select(x => x.Total)
        };
    }

    public async Task<object> GetListAsync(LeaveRequestFilterOptions filterOptions, ApplicationUser user)
    {
        var query = from a in _context.LeaveRequests
                    select a;
        if (user.UserType == UserType.Dean)
        {
            query = query.Where(x => x.DepartmentId == user.DepartmentId);
        }
        if (user.UserType == UserType.Lecturer)
        {
            query = query.Where(x => x.UserName == user.UserName);
        }
        if (filterOptions.LeaveTypeId != null)
        {
            query = query.Where(x => x.LeaveTypeId == filterOptions.LeaveTypeId);
        }
        if (filterOptions.Status != null)
        {
            query = query.Where(x => x.Status == filterOptions.Status);
        }

        query = query.OrderByDescending(x => x.CreatedDate);

        var data = await query.Skip((filterOptions.Current - 1) * filterOptions.PageSize).Take(filterOptions.PageSize).ToListAsync();

        var userQuery =  _userManager.Users.Where(x => x.Status != UserStatus.Inactive && x.UserType != UserType.Student);
        if (user.UserType == UserType.Administrator)
        {
            userQuery = userQuery.Where(x => x.UserType == UserType.Dean);
        }

        var users = await userQuery.AsNoTracking().ToListAsync();

        var result = new List<LeaveRequestListItem>();
        foreach (var item in data)
        {
            var leaveItem = new LeaveRequestListItem
            {
                Id = item.Id,
                UserName = item.UserName,
                ApprovedAt = item.ApprovedAt,
                ApprovedBy = item.ApprovedBy,
                CreatedDate = item.CreatedDate,
                EndDate = item.StartDate.AddDays(item.TotalDays),
                TotalDays = item.TotalDays,
                StartDate = item.StartDate,
                LeaveTypeId = item.LeaveTypeId,
                ModifiedDate = item.ModifiedDate,
                Status = item.Status,
                Reason = item.Reason,
                Comments = item.Comments,
                SectionType = item.SessionType
            };
            if (user.UserType != UserType.Lecturer)
            {
                var lecturer = users.FirstOrDefault(x => x.UserName == item.UserName);
                if (lecturer is null) continue;
                leaveItem.Gender = lecturer.Gender != null && (lecturer.Gender == 1);
                leaveItem.FullName = lecturer.Name;
                leaveItem.DateOfBirth = lecturer.DateOfBirth;
            }
            else
            {
                leaveItem.FullName = user.Name;
                leaveItem.DateOfBirth = user.DateOfBirth;
                leaveItem.Gender = user.Gender != null && (user.Gender == 1);
            }

            // Can approve if the user is a dean or an administrator and the leave status is pending
            leaveItem.CanApprove = (user.UserType == UserType.Dean || user.UserType == UserType.Administrator) && item.Status == LeaveStatus.Pending;
            result.Add(leaveItem);
        }

        return new { data = result, total = await query.CountAsync() };
    }

    public async Task<object?> GetRequestCountAsync(RequestCountFilterOptions filterOptions, ApplicationUser user)
    {
        var query = from a in _context.LeaveRequests
                    select new
                    {
                        a.Id,
                        a.Status,
                        a.UserName,
                        a.DepartmentId
                    };

        if (user.UserType == UserType.Lecturer)
        {
            query = query.Where(x => x.UserName == user.UserName);
        }

        if (user.UserType != UserType.Administrator)
        {
            query = query.Where(x => x.DepartmentId == user.DepartmentId);
        }

        return new
        {
            total = await query.CountAsync(),
            reject = await query.CountAsync(x => x.Status == LeaveStatus.Rejected),
            pending = await query.CountAsync(x => x.Status == LeaveStatus.Pending),
            approved = await query.CountAsync(x => x.Status == LeaveStatus.Approved)
        };
    }

    public async Task<ListResult<LeaveUserListItem>> ListUserAsync(LeaveUserFilterOptions filterOptions)
    {
        var data = new List<LeaveUserListItem>();
        var userQuery = _userManager.Users.Where(x => x.Status != UserStatus.Inactive && x.UserType != UserType.Student);
        if (filterOptions.DepartmentId != null)
        {
            userQuery = userQuery.Where(x => x.DepartmentId == filterOptions.DepartmentId);
        }
        if (!string.IsNullOrWhiteSpace(filterOptions.UserName))
        {
            userQuery = userQuery.Where(x => !string.IsNullOrEmpty(x.UserName) && x.UserName.ToLower().Contains(filterOptions.UserName.ToLower()));
        }
        if (!string.IsNullOrWhiteSpace(filterOptions.FullName))
        {
            userQuery = userQuery.Where(x => !string.IsNullOrEmpty(x.Name) && x.Name.ToLower().Contains(filterOptions.FullName.ToLower()));
        }
        var users = await userQuery.AsNoTracking().Skip((filterOptions.Current - 1) * filterOptions.PageSize).Take(filterOptions.PageSize).ToListAsync();
        var leaveRequests = await _context.LeaveRequests
            .Where(x => x.StartDate.Date >= filterOptions.FromDate.Date && x.StartDate.Date <= filterOptions.ToDate.Date).AsNoTracking().ToListAsync();

        foreach (var item in users)
        {
            data.Add(new LeaveUserListItem
            {
                Approved = leaveRequests.Count(x => x.UserName == item.UserName && x.Status == LeaveStatus.Approved),
                Pending = leaveRequests.Count(x => x.UserName == item.UserName && x.Status == LeaveStatus.Pending),
                Rejected = leaveRequests.Count(x => x.UserName == item.UserName && x.Status == LeaveStatus.Rejected),
                FullName = item.Name,
                UserName = item.UserName,
                DateOfBirth = item.DateOfBirth,
                Gender = item.Gender != null ? item.Gender == 1 : null,
                Total = leaveRequests.Count(x => x.UserName == item.UserName)
            });
        }

        return new ListResult<LeaveUserListItem>(data, await userQuery.CountAsync(), filterOptions);
    }
}
