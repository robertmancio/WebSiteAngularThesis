using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using Duende.Bff.Yarp;
using JavaScriptClient.Data.Context;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                       ?? throw new InvalidOperationException("Connection string 'ApplicationDbContextConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));


builder.Services.AddControllers();


builder.Services.AddAuthorization();

builder.Services.AddBff(options=>
options.LicenseKey= "eyJhbGciOiJQUzI1NiIsImtpZCI6IklkZW50aXR5U2VydmVyTGljZW5zZWtleS83Y2VhZGJiNzgxMzA0NjllODgwNjg5MTAyNTQxNGYxNiIsInR5cCI6ImxpY2Vuc2Urand0In0.eyJpc3MiOiJodHRwczovL2R1ZW5kZXNvZnR3YXJlLmNvbSIsImF1ZCI6IklkZW50aXR5U2VydmVyIiwiaWF0IjoxNjYwNTQzNDk4LCJleHAiOjE2OTIwNzk0OTgsImNvbXBhbnlfbmFtZSI6Ikd1YXRlbWFsYSBGZWxpeiBJbXBvcnRzIiwiY29udGFjdF9pbmZvIjoicm9iZXJ0bG1hbmNpb0BnbWFpbC5jb20iLCJlZGl0aW9uIjoiQ29tbXVuaXR5In0.U9EibndkhBHxbH4qnmGhPLom3rjQpLp7FNcFZktMOLA8Qe1vYEbS7u9W_Z8RHRn6q3goAbb7Lv_MVLHxfJYyUZ4HUip3zPa6nZlc41TqOiwyQlk9Tr9SknHFPSvrB3OcHjrGHB1r0wfpcbbSJk-pusMJYfNfOPBxle7zSeN2VYelhdGSOFd6JAt33hEjJojbj42z0R-0_iPiKb1-wPHCZyo9TkbOO8MDuj9jnctX5H6SUrC6-Nbep742BC3ibMB78H2m1LSOBvE0tCrT2dKbpxW5pG-IDRCqKLR09HK8NGDqh0bzgikYqageDtZjQhDsI3whgrvfXqugWjirZV95Lw"
    ).AddRemoteApis();

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultScheme = "Cookies";
        options.DefaultChallengeScheme = "oidc";
        options.DefaultSignOutScheme = "oidc";
    })
    .AddCookie("Cookies", options =>
    {
        options.Cookie.Name = "__Host-bff";
        options.Cookie.SameSite = SameSiteMode.Strict;
    }).AddOpenIdConnect("oidc", options =>
    {
        options.Authority = "https://localhost:5001";
        //options.Authority = "https://guatemalafelizimportssecurity.azurewebsites.net";
        options.ClientId = "bff";
        options.ClientSecret = "secret";
        options.ResponseType = "code";
        //options.ResponseMode = "query";

        options.GetClaimsFromUserInfoEndpoint = true;
        options.MapInboundClaims = false;
        options.SaveTokens = true;

        options.Scope.Clear();
        options.Scope.Add("openid");
        options.Scope.Add("profile");
        options.Scope.Add("api1");
        options.Scope.Add("IdentityServerApi");
        options.Scope.Add("color");
        options.Scope.Add("offline_access");
        options.Scope.Add("custom.profile");

        options.Scope.Add("color");
        options.Scope.Add("custom.profile");

        options.GetClaimsFromUserInfoEndpoint = true;
        options.ClaimActions.MapUniqueJsonKey("favorite_color", "favorite_color");
        options.ClaimActions.MapUniqueJsonKey("offline_access", "offline_access");
        options.ClaimActions.MapUniqueJsonKey("role", "role");
        options.ClaimActions.MapUniqueJsonKey("preferred_username", "preferred_username");

        options.TokenValidationParameters = new()
        {
            NameClaimType = "name",
            RoleClaimType = "role"
        };
    });

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthentication();
app.UseRouting();

app.UseBff();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapBffManagementEndpoints();

    // Uncomment this for Controller support
    endpoints.MapControllers()
        .RequireAuthorization()
        .AsBffApiEndpoint(requireAntiForgeryCheck: false);

    endpoints.MapRemoteBffApiEndpoint("/remote", "https://localhost:5001", requireAntiForgeryCheck: false)
    //endpoints.MapRemoteBffApiEndpoint("/remote", "https://guatemalafelizimportssecurity.azurewebsites.net", requireAntiForgeryCheck: false)
        .RequireAccessToken(Duende.Bff.TokenType.User);

    endpoints.MapControllers()
        .RequireAuthorization()
        .AsBffApiEndpoint(requireAntiForgeryCheck: false);

    endpoints.MapFallbackToFile("/index.html");
    //endpoints.MapFallbackToFile("../ClientApp/src/index.html");
});

app.Run();