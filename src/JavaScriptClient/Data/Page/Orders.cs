namespace JavaScriptClient.Data.Page
{
    public class Order
    {
        public int Id { get; set; }
        public int Amount { get; set; }
        public DateTime Date { get; set; }
        public int ClientId { get; set; }
        public Client Client { get; set; }
        public int InventoryProductId { get; set; }
        public InventoryProduct InventoryProduct { get; set; }
    }
}
