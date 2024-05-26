namespace Registration_Login_Page.Server.Models
{
    public class Login
    {
        public string UserName {  get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool remember{ get; set; }
    }
}
