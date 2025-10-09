namespace API.Models.ProgramSettings
{
    public class MongoDBSettings
    {
        required public string ConnectionString { get; set; }
        required public string DatabaseName { get; set; }
    }
}
