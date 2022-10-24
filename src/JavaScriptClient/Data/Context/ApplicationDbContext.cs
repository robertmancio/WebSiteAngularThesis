using JavaScriptClient.Data.Page;
using Microsoft.EntityFrameworkCore;

namespace JavaScriptClient.Data.Context;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    public DbSet<Product> Products { get; set; }
    public DbSet<InventoryProduct> InventoryProducts { get; set; }
    public DbSet<Client> Clients { get; set; }
    public DbSet<Order> Orders { get; set; }
}
