namespace JavaScriptClient.Data.Page
{
    public class InventoryProduct
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string Details { get; set; }
        public double Price { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
