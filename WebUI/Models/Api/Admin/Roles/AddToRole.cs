using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebUI.Models.Api.Admin.Roles
{
    public class AddToRole
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public string RoleName { get; set; }
    }
}
