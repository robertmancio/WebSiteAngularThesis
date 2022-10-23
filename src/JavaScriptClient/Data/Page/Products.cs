namespace JavaScriptClient.Data.Page
{
    public class ProductInventory
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Details { get; set; }
        public double Price { get; set; }
        public int ProductId { get; set; }
        public Product? Product { get; set; }
    }
}
