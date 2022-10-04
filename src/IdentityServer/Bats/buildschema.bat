rmdir /S /Q "Data/Migrations"

dotnet ef migrations add InitialUsers -c ApplicationDbContext -o Migrations/Security/ApplicationDb
dotnet ef migrations add InitialIdentityServerPersistedGrantDbMigration -c PersistedGrantDbContext -o Migrations/Security/PersistedGrantDb
dotnet ef migrations add InitialIdentityServerConfigurationDbMigration -c ConfigurationDbContext -o Migrations/Security/ConfigurationDb