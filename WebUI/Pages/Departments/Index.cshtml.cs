using ApplicationCore.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebUI.Pages.Departments
{
    public class IndexModel : PageModel
    {
        private readonly ApplicationDbContext _context;
        public IndexModel(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Department> Departments { get; set; }
        public Department Department { get; set; }

        public async Task<IActionResult> OnGetAsync(Guid? id)
        {
            Departments = await _context.Departments.ToListAsync();
            if (id == null)
            {
                Department = await _context.Departments.FirstOrDefaultAsync();
            }
            else
            {
                Department = await _context.Departments.FirstAsync();
            }



            return Page();
        }
    }
}
