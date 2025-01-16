using Microsoft.AspNetCore.Mvc;
using THPHome.Data;
using WebUI.ExternalAPI.Interfaces;
using WebUI.Foundations;

namespace THPHome.Controllers;

public class ZaloController(ApplicationDbContext context) : BaseController(context)
{
}
