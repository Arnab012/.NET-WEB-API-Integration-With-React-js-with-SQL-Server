using Microsoft.EntityFrameworkCore;
using Registration_Login_Page.Server.Data;
using Registration_Login_Page.Server.Models;

namespace Registration_Login_Page.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddAuthorization();
            builder.Services.AddDbContext<ApploicationDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DBCS"));

            });
            builder.Services.AddIdentityApiEndpoints<User>().AddEntityFrameworkStores<ApploicationDbContext>();
            builder.Services.AddIdentityCore<User>(options =>
            {
                options.SignIn.RequireConfirmedAccount = true;
                options.Password.RequireDigit   = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredUniqueChars = 0;
                options.Password.RequiredLength = 6;


                options.Lockout.AllowedForNewUsers = true;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;

                options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-._@+";
                options.User.RequireUniqueEmail = true;

            }).AddEntityFrameworkStores<ApploicationDbContext>();



            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();

            app.UseAuthorization();
            app.MapIdentityApi<User>();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
