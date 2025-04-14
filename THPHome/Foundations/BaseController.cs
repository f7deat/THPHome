using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using THPHome.Data;

namespace THPHome.Foundations;

[Route("api/[controller]"), Authorize]
public class BaseController(ApplicationDbContext context) : Controller
{
    protected readonly ApplicationDbContext _context = context;
}
