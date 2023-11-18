using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Api
{
    [Route("api/[controller]"), Authorize]
    public class BaseController : Controller
    {

    }
}
