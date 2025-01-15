using System;
using System.Collections.Generic;
using System.Text;
using THPHome.Entities;

namespace ApplicationCore.ViewModels
{
    public class MenuViewModel : Menu
    {
        public IEnumerable<MenuViewModel>? Children { get; set; }
    }
}
