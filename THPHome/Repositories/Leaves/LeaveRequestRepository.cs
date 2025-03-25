using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using THPHome.Data;
using THPHome.Entities.Leaves;
using THPHome.Interfaces.IRepository.ILeaves;
using THPHome.Models.Filters.Leaves;
using THPHome.Models.Results.Leaves;
using THPHome.Repositories.Base;
using THPHome.Services.Leaves.Filters;
using THPIdentity.Entities;

namespace THPHome.Repositories.Leaves;

public class LeaveRequestRepository(ApplicationDbContext context, UserManager<ApplicationUser> _userManager) : EfRepository<LeaveRequest>(context), ILeaveRequestRepository
{
    public async Task<object?> GetCountByDepartmentAsync()
    {
        var query = from a in _context.LeaveRequests
                    join b in _context.Departments on a.DepartmentId equals b.Code
                    group new { b.Name, a.Status } by b.Name  into g
                    select new
                    {
                        Department = g.Key,
                        Count = g.Count(),
                        Pending = g.Count(x => x.Status == LeaveStatus.Pending),
                        Approved = g.Count(x => x.Status == LeaveStatus.Approved),
                        Rejected = g.Count(x => x.Status == LeaveStatus.Rejected)
                    };
        return new { data = await query.ToListAsync(), total = await query.CountAsync() };
    }

    public async Task<object> GetListAsync(LeaveRequestFilterOptions filterOptions, ApplicationUser user)
    {
        var query = from a in _context.LeaveRequests
                    where a.DepartmentId == user.DepartmentId
                    select a;
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

        var users = await _userManager.Users.Where(x => x.Status != UserStatus.Inactive && x.UserType != UserType.Student).AsNoTracking().ToListAsync();

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
                Comments = item.Comments
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
}
