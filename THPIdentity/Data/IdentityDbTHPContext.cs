using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using THPIdentity.Entities;

namespace THPIdentity.Data;

public class IdentityDbTHPContext(DbContextOptions<IdentityDbTHPContext> options) : IdentityDbContext<ApplicationUser>(options)
{
}
