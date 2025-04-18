using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using THPHome.Data;
using THPHome.Foundations;
using THPHome.Interfaces.IService.ILeaves;
using THPHome.Models.Filters.Leaves;
using THPHome.Services.Leaves.Args;
using THPHome.Services.Leaves.Filters;

namespace THPHome.Controllers;

public class LeaveController(ApplicationDbContext context, ILeaveBalanceService _leaveBalanceService, ILeaveRequestService _leaveRequestService, ILeaveTypeService _leaveTypeService) : BaseController(context)
{
    [HttpGet("request/list")]
    public async Task<IActionResult> ListRequestAsync([FromQuery] LeaveRequestFilterOptions filterOptions) => Ok(await _leaveRequestService.GetListAsync(filterOptions));

    [HttpGet("type/options")]
    public async Task<IActionResult> GetTypeOptionsAsync() => Ok(await _leaveTypeService.GetOptionsAsync());

    [HttpGet("balance-by-type/{id}"), AllowAnonymous]
    public async Task<IActionResult> GetBalanceAsync([FromRoute] int id) => Ok(await _leaveBalanceService.GetBalanceByTypeAsync(id));

    [HttpPost("request/create")]
    public async Task<IActionResult> CreateRequestAsync([FromBody] LeaveRequestCreateArgs args)
    {
        var result = await _leaveRequestService.CreateAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpDelete("request/{id}")]
    public async Task<IActionResult> DeleteRequestAsync([FromRoute] Guid id)
    {
        var result = await _leaveRequestService.DeleteAsync(id);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPut("request/update")]
    public async Task<IActionResult> UpdateRequestAsync([FromBody] LeaveRequestUpdateArgs args)
    {
        var result = await _leaveRequestService.UpdateAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPost("request/approve")]
    public async Task<IActionResult> ApproveRequestAsync([FromBody] LeaveRequestApproveArgs args)
    {
        var result = await _leaveRequestService.ApproveAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpPost("request/reject")]
    public async Task<IActionResult> RejectRequestAsync([FromBody] LeaveRequestRejectArgs args)
    {
        var result = await _leaveRequestService.RejectAsync(args);
        if (!result.Succeeded) return BadRequest(result.Message);
        return Ok(result);
    }

    [HttpGet("request/count")]
    public async Task<IActionResult> GetRequestCountAsync([FromQuery] RequestCountFilterOptions filterOptions) => Ok(new { data = await _leaveRequestService.GetRequestCountAsync(filterOptions) });

    [HttpGet("request/count-by-department")]
    public async Task<IActionResult> GetCountByDepartmentAsync(LeaveRequestFilterOptions filterOptions) => Ok(await _leaveRequestService.GetCountByDepartmentAsync(filterOptions));

    [HttpGet("chart")]
    public async Task<IActionResult> GetChartAsync([FromQuery] LeaveRequestFilterOptions filterOptions) => Ok(new { data = await _leaveRequestService.GetChartAsync(filterOptions) });

    [HttpGet("list-user")]
    public async Task<IActionResult> ListUserAsync([FromQuery] LeaveUserFilterOptions filterOptions) => Ok(await _leaveRequestService.ListUserAsync(filterOptions));
}
