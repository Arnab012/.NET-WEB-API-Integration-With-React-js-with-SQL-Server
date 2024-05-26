using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Registration_Login_Page.Server.Models;

namespace Registration_Login_Page.Server.Data
{
    public class ApploicationDbContext:IdentityDbContext<User>
    {
        public ApploicationDbContext(DbContextOptions<ApploicationDbContext> options) : base(options)
        {

        }
            
        

    }
}
