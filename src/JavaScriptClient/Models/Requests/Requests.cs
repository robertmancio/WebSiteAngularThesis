namespace JavaScriptClient.Models.Requests
{
    public class CreateProduct
    {
        public string Name { get; set; }
    }
    public class UpdateProduct
    {
        public int id { get; set; }
        public string Name { get; set; }
    }

}
