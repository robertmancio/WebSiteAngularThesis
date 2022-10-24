using JavaScriptClient.Data.Page;
using Microsoft.EntityFrameworkCore;

namespace JavaScriptClient.Data.Context;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    public DbSet<Product> Products { get; set; }
    public DbSet<InventoryProduct> Product { get; set; }
    public DbSet<Clients> Client { get; set; }
    public DbSet<Orders> Order { get; set; }
}
