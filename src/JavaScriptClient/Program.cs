using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using Duende.Bff.Yarp;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();

builder.Services.AddAuthorization();

builder.Services.AddBff()
    .AddRemoteApis();

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
        options.Scope.Add("color");
        options.Scope.Add("offline_access");
        options.Scope.Add("custom.profile");

        options.Scope.Add("color");
        options.Scope.Add("custom.profile");

        options.GetClaimsFromUserInfoEndpoint = true;
        options.ClaimActions.MapUniqueJsonKey("favorite_color", "favorite_color");
        options.ClaimActions.MapUniqueJsonKey("offline_access", "offline_access");
        options.ClaimActions.MapUniqueJsonKey("role", "role");

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

    endpoints.MapGet("/local/identity", LocalIdentityHandler)
        .AsBffApiEndpoint(requireAntiForgeryCheck: false);

    endpoints.MapRemoteBffApiEndpoint("/remote", "https://localhost:6001")
        .RequireAccessToken(Duende.Bff.TokenType.User);

    endpoints.MapFallbackToFile("/index.html");
    //endpoints.MapFallbackToFile("../ClientApp/src/index.html");
});

app.Run();

[Authorize]
static IResult LocalIdentityHandler(ClaimsPrincipal user, HttpContext context)
{
    var name = user.FindFirst("name")?.Value ?? user.FindFirst("sub")?.Value;
    return Results.Json(new { message = "Local API Success!", user = name });
}