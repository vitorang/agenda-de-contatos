using API.DTOs;
using API.Models;
using API.Services;
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
        const string databaseName = "agenda_de_contatos";

        private readonly MongoDbContainer mongoContainer = new MongoDbBuilder()
            .WithImage("mongo:latest")
            .WithReplicaSet()
            .Build();

        public async Task InitializeAsync()
        {
            await mongoContainer.StartAsync();
            await mongoContainer.ExecScriptAsync("rs.initiate();");
            InsertInitialData();
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
                    ["MongoDb:DatabaseName"] = databaseName
                });
            });
        }

        private void InsertInitialData()
        {
            var client = new MongoClient(mongoContainer.GetConnectionString());
            var database = client.GetDatabase(databaseName);
            var usersCollection = database.GetCollection<User>("users");

            usersCollection.InsertMany([
                new User
                {
                    Salt = 1,
                    Username = "test",
                    PasswordHash = UserService.CalculePasswordHash("test", 1),
                },
                new User
                {
                    Salt = 1,
                    Username = "test2",
                    PasswordHash = UserService.CalculePasswordHash("test2", 1)
                }
            ]);
        }
    }
}
