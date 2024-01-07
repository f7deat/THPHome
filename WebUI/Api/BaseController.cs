using ApplicationCore.Enums;
using ApplicationCore.Models.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Api
{
    [Route("api/[controller]"), Authorize]
    public class BaseController : Controller
    {
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
