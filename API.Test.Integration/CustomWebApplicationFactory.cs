using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Testcontainers.MongoDb;

namespace API.Test.Integration
{
    public class CustomWebApplicationFactory : WebApplicationFactory<Program>, IAsyncLifetime
    {
        private readonly MongoDbContainer mongoContainer = new MongoDbBuilder()
            .WithImage("mongo:latest")
            .WithReplicaSet()
            .Build();

        public async Task InitializeAsync()
        {
            await mongoContainer.StartAsync();
            await mongoContainer.ExecScriptAsync("rs.initiate();");
        }

        public new async Task DisposeAsync()
        {
            await mongoContainer.DisposeAsync();
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureTestServices(services =>
            {
                var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(IMongoClient));
                if (descriptor != null) services.Remove(descriptor);

                services.AddSingleton<IMongoClient>(new MongoClient(mongoContainer.GetConnectionString()));
            });

            builder.ConfigureAppConfiguration((context, config) =>
            {
                config.AddInMemoryCollection(new Dictionary<string, string?>
                {
                    ["MongoDb:ConnectionString"] = mongoContainer.GetConnectionString(),
                    ["MongoDb:DatabaseName"] = "agenda_de_contatos"
                });
            });
        }
    }
}
