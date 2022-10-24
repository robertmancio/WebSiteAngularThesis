using JavaScriptClient.Data.Context;
using JavaScriptClient.Data.Page;
using JavaScriptClient.Models.Requests;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FootballPools.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InventoryProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InventoryProductController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var products = await _context.Product.Include(x => x.Product).
                ToListAsync();
            return Ok(products.Adapt<List<InventoryProduct>>());
        }
        //[HttpGet]
        //public async Task<List<ProductInventory>> Get()
        //{
        //    return await _context.Product.ToListAsync();
        //}

        [HttpGet("{id}")]
        public async Task<InventoryProduct> Get(int id)
        {
            return await _context.Product.SingleOrDefaultAsync(x => x.Id == id);
        }

        [HttpPost]
        public async Task<InventoryProduct> Post(InventoryProduct request)
        {
            var newProduct = request.Adapt<InventoryProduct>();
            await _context.AddAsync(newProduct);
            await _context.SaveChangesAsync();
            return newProduct;
        }
        [HttpPatch]
        public async Task<Product> Patch(InventoryProduct request)
        {
            var product = await _context.Products.FindAsync(request.Id);
            if (product == null)
            {
            }
            var UpdateProductCategory = request.Adapt(product);
            _context.Update(UpdateProductCategory);
            await _context.SaveChangesAsync();
            return UpdateProductCategory;
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
            }
            _context.Remove(product);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}