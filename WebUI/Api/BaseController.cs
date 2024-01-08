using ApplicationCore.Enums;
using ApplicationCore.Models.Filters;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Api
{
    [Route("api/[controller]"), Authorize]
    public class BaseController : Controller
    {
        protected readonly ApplicationDbContext _context;

        public BaseController(ApplicationDbContext context)
        {
            _context = context;
        }

        protected Language GetLanguage()
        {
            Request.Cookies.TryGetValue("locale", out string locale);
            var lang = Language.VI;
            if (!string.IsNullOrEmpty(locale))
            {
                if (locale == "en-US")
                {
                    lang = Language.EN;
                }
            }
            return lang;
        }
    }
}
