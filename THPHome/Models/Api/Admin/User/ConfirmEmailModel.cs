using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebUI.Models.Api.Admin.Users
{
    public class ConfirmEmailModel
    {
        public string  UserId { get; set; }
        public string Code { get; set; }
    }
}
