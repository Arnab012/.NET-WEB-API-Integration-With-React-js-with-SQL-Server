using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Registration_Login_Page.Server.Models;
using System.Security.Claims;

namespace Registration_Login_Page.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecureSiteController(SignInManager<User> sn, UserManager<User> us) : ControllerBase
    {
        private readonly SignInManager<User> signInManager = sn;
        private readonly UserManager<User> userManager = us;

        [HttpPost("Register")]
        public async Task<ActionResult> RegisterUser(User user)
        {
            string message = "";
            IdentityResult result = new();

            try
            {
                User user_ = new User()
                {
                    Name = user.Name,
                    Email = user.Email,
                    UserName = user.UserName,

                };
                result = await userManager.CreateAsync(user_);
                if (!result.Succeeded) {

                    return BadRequest(result);


                }
                message = "Registered SucessFully..";

            } catch (Exception ex)
            {
                return BadRequest("SomeThing went wrong Please Try again Later ....."+ex.Message);
            }
            return Ok(new { message = message,result=result });

        }



        [HttpPost("login")]
        public async Task<ActionResult> LoginUser(Login login)
        {
            string message = "";
      

            try
            {
                User user_ = await userManager.FindByEmailAsync(login.Email);
                if(user_!= null&&!user_.EmailConfirmed)
                {

                    user_.EmailConfirmed = true;
                }
                var result = await signInManager.PasswordSignInAsync(user_, login.Password, login.remember, false);
            
                if (!result.Succeeded)
                {

                    return Unauthorized("check Your Login Credentials and try again"); 



                }
                user_.LastLogin = DateTime.Now;
                var UpdateResult=await userManager.UpdateAsync(user_);
                message = "Login SucessFully..";

            }
            catch (Exception ex)
            {
                return BadRequest("SomeThing went wrong Please Try again Later ....." + ex.Message);
            }
            return Ok(new { message = message});

        }
        [HttpGet("logout"),Authorize]
        public async Task<ActionResult> LogoutUser()
        {
            string message = "You are free to do";

            try
            {

                await signInManager.SignOutAsync();
                    
            }
            catch (Exception ex)
            {return BadRequest("Something went wrong please try again later"+ ex.Message);


            }
            return Ok(new { message = message});
        }




        [HttpGet("admin"),Authorize]

        public async Task<ActionResult> AdminPage()
        {

            string[] partners =
            {
                "Arnab Kumar Hansda","ankit Mahato","Ritesh yadav","Jhantu Samui","annesha Naskar","shrabani singgha"
            };
            return Ok (new {trustedPartners=partners}); 

        }



        [HttpGet("home/{email}"),Authorize]

        public async Task<ActionResult>Homepage(string email)
        {
            User userInfo= await userManager.FindByEmailAsync(email);
            if (userInfo != null)
            {
                return BadRequest(new {message= "Something went wrong please try angain Later...." });
            }
            return Ok(new {userInfo=userInfo});
        }




        [HttpGet("xhtlekd"), Authorize]
        public async Task<ActionResult> CheckUser()
        {
            string message = "Logged In";
            User Currentuser = new();

            try
            {
                var user_ = HttpContext.User;
                var principal = new ClaimsPrincipal(user_);
                var result = signInManager.IsSignedIn(principal);
                if (result)
                {
                    Currentuser = await signInManager.UserManager.GetUserAsync(principal);
                }
                else
                {
                    return Forbid("Access denied");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong, please try again later: " + ex.Message);
            }

            return Ok(new { message = message, user = Currentuser });
        }
    }
}