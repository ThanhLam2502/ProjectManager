using System;

namespace ProjectManager.Entities.Models.Extensions
{
    public class AuthenticatedModel
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public DateTime? DateExpired { get; set; }
    }
}
