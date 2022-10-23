using Duende.IdentityServer;
using Duende.IdentityServer.EntityFramework.DbContexts;
using Duende.IdentityServer.EntityFramework.Mappers;
using Duende.IdentityServer.Models;
using IdentityModel;
using IdentityServerAspNetIdentity.Data;
using IdentityServerAspNetIdentity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System.Reflection.Metadata;
using System.Security.Claims;
using System.Text.Json.Serialization;
using static System.Formats.Asn1.AsnWriter;

namespace IdentityServerAspNetIdentity;

internal static class HostingExtensions
{
    public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddRazorPages();

        var migrationsAssembly = typeof(Program).Assembly.GetName().Name;

        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

        builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();
        builder.Services.AddLocalApiAuthentication();
        builder.Services
            .AddIdentityServer(options =>
            {
                options.LicenseKey = "eyJhbGciOiJQUzI1NiIsImtpZCI6IklkZW50aXR5U2VydmVyTGljZW5zZWtleS83Y2VhZGJiNzgxMzA0NjllODgwNjg5MTAyNTQxNGYxNiIsInR5cCI6ImxpY2Vuc2Urand0In0.eyJpc3MiOiJodHRwczovL2R1ZW5kZXNvZnR3YXJlLmNvbSIsImF1ZCI6IklkZW50aXR5U2VydmVyIiwiaWF0IjoxNjYwNTQzNDk4LCJleHAiOjE2OTIwNzk0OTgsImNvbXBhbnlfbmFtZSI6Ikd1YXRlbWFsYSBGZWxpeiBJbXBvcnRzIiwiY29udGFjdF9pbmZvIjoicm9iZXJ0bG1hbmNpb0BnbWFpbC5jb20iLCJlZGl0aW9uIjoiQ29tbXVuaXR5In0.U9EibndkhBHxbH4qnmGhPLom3rjQpLp7FNcFZktMOLA8Qe1vYEbS7u9W_Z8RHRn6q3goAbb7Lv_MVLHxfJYyUZ4HUip3zPa6nZlc41TqOiwyQlk9Tr9SknHFPSvrB3OcHjrGHB1r0wfpcbbSJk-pusMJYfNfOPBxle7zSeN2VYelhdGSOFd6JAt33hEjJojbj42z0R-0_iPiKb1-wPHCZyo9TkbOO8MDuj9jnctX5H6SUrC6-Nbep742BC3ibMB78H2m1LSOBvE0tCrT2dKbpxW5pG-IDRCqKLR09HK8NGDqh0bzgikYqageDtZjQhDsI3whgrvfXqugWjirZV95Lw";
                options.Events.RaiseErrorEvents = true;
                options.Events.RaiseInformationEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseSuccessEvents = true;

                // see https://docs.duendesoftware.com/identityserver/v6/fundamentals/resources/
                options.EmitStaticAudienceClaim = true;
            })
            .AddConfigurationStore(options =>
            {
                options.ConfigureDbContext = b => b.UseSqlServer(connectionString,
                    sql => sql.MigrationsAssembly(migrationsAssembly));
            })
            .AddOperationalStore(options =>
            {
                options.ConfigureDbContext = b => b.UseSqlServer(connectionString,
                    sql => sql.MigrationsAssembly(migrationsAssembly));
            })
            .AddAspNetIdentity<ApplicationUser>()
            .AddProfileService<CustomProfileService>();

        //builder.Services.AddAuthentication()
        //    .AddGoogle(options =>
        //    {
        //        options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;

        //        // register your IdentityServer with Google at https://console.developers.google.com
        //        // enable the Google+ API
        //        // set the redirect URI to https://localhost:5001/signin-google
        //        options.ClientId = "copy client ID from Google here";
        //        options.ClientSecret = "copy client secret from Google here";
        //    });
        builder.Services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
        });
        return builder.Build();
    }

    public static WebApplication ConfigurePipeline(this WebApplication app)
    {
        app.UseSerilogRequestLogging();

        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        InitializeDatabase(app);

        app.UseStaticFiles();
        app.UseRouting();
        app.UseIdentityServer();
        app.UseAuthorization();

        app.MapRazorPages()
            .RequireAuthorization();

        return app;
    }

    private static void InitializeDatabase(IApplicationBuilder app)
    {
        using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
        {
            var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();
            var persistedGrantContext = serviceScope.ServiceProvider.GetService<PersistedGrantDbContext>();
            var configContext = serviceScope.ServiceProvider.GetRequiredService<ConfigurationDbContext>();

            var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            //context.Database.EnsureDeleted();
            //persistedGrantContext.Database.EnsureDeleted();
            //configContext.Database.EnsureDeleted();

            //context.Database.Migrate();
            //persistedGrantContext.Database.Migrate();
            //configContext.Database.Migrate();

            if (!configContext.Clients.Any())
                foreach (var client in Config.Clients)
                    configContext.Clients.Add(client.ToEntity());

            if (!configContext.IdentityResources.Any())
                foreach (var resource in Config.IdentityResources)
                    configContext.IdentityResources.Add(resource.ToEntity());

            if (!configContext.ApiScopes.Any())
                foreach (var resource in Config.ApiScopes)
                    configContext.ApiScopes.Add(resource.ToEntity());

            if (!context.Users.Any())
                foreach (var user in Config.Users)
                {
                    var result = userManager.CreateAsync(user, "Pass123$").Result;
                    result = userManager.AddClaimsAsync(user, new Claim[]{
                            new Claim(JwtClaimTypes.Name, user.UserName + " " + "Bob Smith"),
                            new Claim(JwtClaimTypes.GivenName, user.UserName + " " + "Bob"),
                            new Claim(JwtClaimTypes.FamilyName, user.UserName + " " + "Smith"),
                            new Claim(JwtClaimTypes.WebSite, user.UserName + " " + "http://bob.com"),
                            new Claim("location", user.UserName + " " + "somewhere")
                        }).Result;
                    if (!result.Succeeded)
                    {
                        throw new Exception(result.Errors.First().Description);
                    }
                }

            if (!context.Roles.Any())
                foreach (var role in Config.Roles)
                    context.Roles.Add(role);

            if (!context.UserRoles.Any())
                foreach (var userRole in Config.UserRoles)
                    context.UserRoles.Add(userRole);

            configContext.SaveChanges();
            context.SaveChanges();
        }
    }
}