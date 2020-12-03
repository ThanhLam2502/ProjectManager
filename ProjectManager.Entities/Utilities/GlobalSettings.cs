namespace ProjectManager.Entities.Utilities
{
    public class GlobalSettings
    {        
        public string ConnectionString { get; set; }
        public TokenSettings TokenSettings { get; set; }
    }

    public class TokenSettings
    {
        public string SecretKey { get; set; }
    }
}
