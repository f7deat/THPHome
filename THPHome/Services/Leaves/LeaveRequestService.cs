using Microsoft.AspNetCore.Identity;
using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Entities.Leaves;
using THPHome.Interfaces.IRepository.ILeaves;
using THPHome.Interfaces.IService;
using THPHome.Interfaces.IService.ILeaves;
using THPHome.Models.Filters.Leaves;
using THPHome.Services.Leaves.Args;
using THPHome.Services.Leaves.Filters;
using THPIdentity.Entities;

namespace THPHome.Services.Leaves;

public class LeaveRequestService(UserManager<ApplicationUser> _userManager, ILogService _logService, ILeaveRequestRepository _leaveRequestRepository, ILeaveBalanceRepository _leaveBalanceRepository, ILeaveTypeRepository _leaveTypeRepository, IHCAService _hcaService) : ILeaveRequestService
{
    static bool IsValidLeaveDays(double leaveDays)
    {
        return leaveDays % 0.5 == 0;
    }

    public async Task<THPResult> ApproveAsync(LeaveRequestApproveArgs args)
    {
        var user = await _userManager.FindByNameAsync(_hcaService.GetUserName());
        if (user == null || string.IsNullOrEmpty(user.UserName)) return THPResult.Failed("Không tìm thấy thông tin người dùng!");
        if (user.UserType == UserType.Student || user.UserType == UserType.Lecturer) return THPResult.Failed("Không có quyền thực hiện thao tác này!");

        var leaveRequest = await _leaveRequestRepository.FindAsync(args.Id);
        if (leaveRequest == null) return THPResult.Failed("Không tìm thấy đơn xin nghỉ phép!");
        if (leaveRequest.Status != LeaveStatus.Pending) return THPResult.Failed("Trạng thái đơn không phải chờ duyệt!");
        leaveRequest.Status = LeaveStatus.Approved;
        leaveRequest.ApprovedBy = _hcaService.GetUserName();
        leaveRequest.ApprovedAt = DateTime.Now;
        leaveRequest.Comments = args.Comments;
        await _leaveRequestRepository.UpdateAsync(leaveRequest);
        return THPResult.Success;
    }

    public async Task<THPResult> CreateAsync(LeaveRequestCreateArgs args)
    {
        try
        {
            if (args.StartDate < DateTime.Now) return THPResult.Failed("Ngày bắt đầu không thể nhỏ hơn ngày hiện tại!");
            if (!IsValidLeaveDays(args.TotalDays)) return THPResult.Failed("Số ngày nghỉ phép không hợp lệ!");

            var leaveType = await _leaveTypeRepository.FindAsync(args.LeaveTypeId);
            if (leaveType == null) return THPResult.Failed("Loại nghỉ phép không tồn tại!");

            var balance = await _leaveBalanceRepository.GetBalanceByTypeAsync(_hcaService.GetUserName(), args.LeaveTypeId);
            if (balance == null) return THPResult.Failed("Không tìm thấy số ngày nghỉ phép!");
            if (balance.AvailableDays < args.TotalDays) return THPResult.Failed("Số ngày nghỉ phép không đủ!");

            var user = await _userManager.FindByNameAsync(_hcaService.GetUserName());
            if (user is null) return THPResult.Failed("Không tìm thấy thông tin người tạo!");

            var leaveRequest = new LeaveRequest
            {
                UserName = _hcaService.GetUserName(),
                LeaveTypeId = args.LeaveTypeId,
                StartDate = args.StartDate,
                TotalDays = args.TotalDays,
                Reason = args.Reason,
                CreatedDate = DateTime.Now,
                Status = LeaveStatus.Pending,
                DepartmentId = user.DepartmentId.GetValueOrDefault()
            };

            await _leaveRequestRepository.AddAsync(leaveRequest);
            return THPResult.Success;
        }
        catch (Exception ex)
        {
            await _logService.ExeptionAsync(ex);
            return THPResult.Failed(ex.ToString());
        }
    }

    public async Task<THPResult> DeleteAsync(Guid id)
    {
        try
        {
            var user = await _userManager.FindByNameAsync(_hcaService.GetUserName());
            if (user == null || string.IsNullOrEmpty(user.UserName)) return THPResult.Failed("Không tìm thấy thông tin người dùng!");

            var leaveRequest = await _leaveRequestRepository.FindAsync(id);
            if (leaveRequest == null) return THPResult.Failed("Không tìm thấy đơn xin nghỉ phép!");

            if (user.UserName != leaveRequest.UserName) return THPResult.Failed("Không có quyền thực hiện thao tác này!");

            if (leaveRequest.Status != LeaveStatus.Pending) return THPResult.Failed("Không thể xóa đơn đã duyệt!");
            await _leaveRequestRepository.DeleteAsync(leaveRequest);
            return THPResult.Success;
        }
        catch (Exception ex)
        {
            await _logService.ExeptionAsync(ex);
            return THPResult.Failed(ex.ToString());
        }
    }

    public Task<object?> GetCountByDepartmentAsync() => _leaveRequestRepository.GetCountByDepartmentAsync();

    public async Task<object?> GetListAsync(LeaveRequestFilterOptions filterOptions)
    {
        var user = await _userManager.FindByNameAsync(_hcaService.GetUserName());
        if (user == null || string.IsNullOrEmpty(user.UserName)) return default;
        filterOptions.DepartmentId = user.DepartmentId;
        return await _leaveRequestRepository.GetListAsync(filterOptions, user);
    }

    public async Task<object?> GetRequestCountAsync(RequestCountFilterOptions filterOptions)
    {
        var user = await _userManager.FindByNameAsync(_hcaService.GetUserName());
        if (user == null || string.IsNullOrEmpty(user.UserName)) return default;
        return await _leaveRequestRepository.GetRequestCountAsync(filterOptions, user);
    }

    public async Task<THPResult> RejectAsync(LeaveRequestRejectArgs args)
    {
        try
        {
            var user = await _userManager.FindByNameAsync(_hcaService.GetUserName());
            if (user == null || string.IsNullOrEmpty(user.UserName)) return THPResult.Failed("Không tìm thấy thông tin người dùng!");
            if (user.UserType == UserType.Student || user.UserType == UserType.Lecturer) return THPResult.Failed("Không có quyền thực hiện thao tác này!");

            var leaveRequest = await _leaveRequestRepository.FindAsync(args.Id);
            if (leaveRequest == null) return THPResult.Failed("Không tìm thấy đơn xin nghỉ phép!");
            if (leaveRequest.Status != LeaveStatus.Pending) return THPResult.Failed("Trạng thái đơn không phải chờ duyệt!");
            leaveRequest.Status = LeaveStatus.Rejected;
            leaveRequest.Comments = args.Comments;
            leaveRequest.ApprovedBy = user.UserName;
            leaveRequest.ApprovedAt = DateTime.Now;
            await _leaveRequestRepository.UpdateAsync(leaveRequest);
            return THPResult.Success;
        }
        catch (Exception ex)
        {
            await _logService.ExeptionAsync(ex);
            return THPResult.Failed(ex.ToString());
        }
    }

    public async Task<THPResult> UpdateAsync(LeaveRequestUpdateArgs args)
    {
        try
        {
            if (args.StartDate < DateTime.Now) return THPResult.Failed("Ngày bắt đầu không thể nhỏ hơn ngày hiện tại!");
            if (!IsValidLeaveDays(args.TotalDays)) return THPResult.Failed("Số ngày nghỉ phép không hợp lệ!");
            var leaveRequest = await _leaveRequestRepository.FindAsync(args.Id);
            if (leaveRequest == null) return THPResult.Failed("Không tìm thấy đơn xin nghỉ phép!");
            if (leaveRequest.Status != LeaveStatus.Pending) return THPResult.Failed("Không thể cập nhật đơn đã duyệt!");
            var endDate = args.StartDate.AddDays(args.TotalDays);
            var leaveType = await _leaveTypeRepository.FindAsync(args.LeaveTypeId);
            if (leaveType == null) return THPResult.Failed("Loại nghỉ phép không tồn tại!");
            leaveRequest.StartDate = args.StartDate;
            leaveRequest.TotalDays = args.TotalDays;
            leaveRequest.Reason = args.Reason;
            leaveRequest.LeaveTypeId = args.LeaveTypeId;
            await _leaveRequestRepository.UpdateAsync(leaveRequest);
            return THPResult.Success;
        }
        catch (Exception ex)
        {
            await _logService.ExeptionAsync(ex);
            return THPResult.Failed(ex.ToString());
        }
    }
}
