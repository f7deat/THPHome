using ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationCore.ViewModels
{
    public class MenuViewModel : Menu
    {
        public List<MenuViewModel> Children { get; set; }
    }
}
