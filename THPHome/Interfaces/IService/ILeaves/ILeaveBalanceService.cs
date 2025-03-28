﻿using THPCore.Models;
using THPHome.Entities.Leaves;

namespace THPHome.Interfaces.IService.ILeaves;

public interface ILeaveBalanceService
{
    Task<LeaveBalance?> GetBalanceByTypeAsync(int id);
}
