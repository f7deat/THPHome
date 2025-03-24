using Microsoft.AspNetCore.Identity;
using THPCore.Interfaces;
using THPCore.Models;
using THPHome.Entities.Leaves;
using THPHome.Interfaces.IRepository.ILeaves;
using THPHome.Interfaces.IService.ILeaves;
using THPHome.Models.Filters.Leaves;
using THPHome.Services.Leaves.Args;
using THPHome.Services.Leaves.Filters;
using THPIdentity.Entities;

namespace THPHome.Services.Leaves;

public class LeaveRequestService(UserManager<ApplicationUser> _userManager, ILeaveRequestRepository _leaveRequestRepository, ILeaveBalanceRepository _leaveBalanceRepository, ILeaveTypeRepository _leaveTypeRepository, IHCAService _hcaService) : ILeaveRequestService
{
    public async Task<THPResult> ApproveAsync(LeaveRequestApproveArgs args)
    {
        var leaveRequest = await _leaveRequestRepository.FindAsync(args.Id);
        if (leaveRequest == null) return THPResult.Failed("Không tìm thấy đơn xin nghỉ phép!");
        if (leaveRequest.Status != LeaveStatus.Pending) return THPResult.Failed("Trạng thái đơn không phải chờ duyệt!");
        leaveRequest.Status = LeaveStatus.Approved;
        leaveRequest.ApprovedBy = _hcaService.GetUserName();
        leaveRequest.ApprovedAt = DateTime.Now;
        await _leaveRequestRepository.UpdateAsync(leaveRequest);
        return THPResult.Success;
    }

    public async Task<THPResult> CreateAsync(LeaveRequestCreateArgs args)
    {
        if (args.StartDate > args.EndDate) return THPResult.Failed("Ngày bắt đầu không thể lớn hơn ngày kết thúc!");
        var leaveType = await _leaveTypeRepository.FindAsync(args.LeaveTypeId);
        if (leaveType == null) return THPResult.Failed("Loại nghỉ phép không tồn tại!");

        var balance = await _leaveBalanceRepository.GetBalanceByTypeAsync(_hcaService.GetUserName(), args.LeaveTypeId);
        if (balance == null) return THPResult.Failed("Không tìm thấy số ngày nghỉ phép!");
        if (balance.AvailableDays < args.TotalDays) return THPResult.Failed("Số ngày nghỉ phép không đủ!");

        var leaveRequest = new LeaveRequest
        {
            UserName = _hcaService.GetUserName(),
            LeaveTypeId = args.LeaveTypeId,
            StartDate = args.StartDate,
            TotalDays = args.TotalDays,
            Reason = args.Reason,
            CreatedDate = DateTime.Now,
            Status = LeaveStatus.Pending
        };

        await _leaveRequestRepository.AddAsync(leaveRequest);
        return THPResult.Success;
    }

    public async Task<THPResult> DeleteAsync(Guid id)
    {
        var leaveRequest = await _leaveRequestRepository.FindAsync(id);
        if (leaveRequest == null) return THPResult.Failed("Không tìm thấy đơn xin nghỉ phép!");
        if (leaveRequest.Status != LeaveStatus.Pending) return THPResult.Failed("Không thể xóa đơn đã duyệt!");
        await _leaveRequestRepository.DeleteAsync(leaveRequest);
        return THPResult.Success;
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
        var leaveRequest = await _leaveRequestRepository.FindAsync(args.Id);
        if (leaveRequest == null) return THPResult.Failed("Không tìm thấy đơn xin nghỉ phép!");
        if (leaveRequest.Status != LeaveStatus.Pending) return THPResult.Failed("Trạng thái đơn không phải chờ duyệt!");
        leaveRequest.Status = LeaveStatus.Rejected;
        leaveRequest.Comments = args.Comments;
        leaveRequest.ApprovedBy = _hcaService.GetUserName();
        leaveRequest.ApprovedAt = DateTime.Now;
        await _leaveRequestRepository.UpdateAsync(leaveRequest);
        return THPResult.Success;
    }

    public async Task<THPResult> UpdateAsync(LeaveRequestUpdateArgs args)
    {
        var leaveRequest = await _leaveRequestRepository.FindAsync(args.Id);
        if (leaveRequest == null) return THPResult.Failed("Không tìm thấy đơn xin nghỉ phép!");
        if (leaveRequest.Status != LeaveStatus.Pending) return THPResult.Failed("Không thể cập nhật đơn đã duyệt!");
        var endDate = args.StartDate.AddDays(args.TotalDays);
        if (args.StartDate > endDate) return THPResult.Failed("Ngày bắt đầu không thể lớn hơn ngày kết thúc!");
        var leaveType = await _leaveTypeRepository.FindAsync(args.LeaveTypeId);
        if (leaveType == null) return THPResult.Failed("Loại nghỉ phép không tồn tại!");
        leaveRequest.StartDate = args.StartDate;
        leaveRequest.TotalDays = args.TotalDays;
        leaveRequest.Reason = args.Reason;
        leaveRequest.LeaveTypeId = args.LeaveTypeId;
        await _leaveRequestRepository.UpdateAsync(leaveRequest);
        return THPResult.Success;
    }
}
