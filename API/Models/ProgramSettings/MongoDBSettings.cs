namespace API.Models.ProgramSettings
{
    public class MongoDbSettings
    {
        required public string ConnectionString { get; set; }
        required public string DatabaseName { get; set; }
    }
}
