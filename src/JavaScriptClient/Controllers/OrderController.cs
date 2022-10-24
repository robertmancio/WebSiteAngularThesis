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
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var products = await _context.Orders.Include(x => x.Client)
                .Include(x=>x.InventoryProduct)
                .ToListAsync();
            return Ok(products.Adapt<List<Order>>());
        }
        //[HttpGet]
        //public async Task<List<ProductInventory>> Get()
        //{
        //    return await _context.Product.ToListAsync();
        //}

        [HttpGet("{id}")]
        public async Task<Order> Get(int id)
        {
            return await _context.Orders.SingleOrDefaultAsync(x => x.Id == id);
        }

        [HttpPost]
        public async Task<Order> Post(Order request)
        {
            var newProduct = request.Adapt<Order>();
            await _context.AddAsync(newProduct);
            await _context.SaveChangesAsync();
            return newProduct;
        }
        [HttpPatch]
        public async Task<Order> Patch(InventoryProduct request)
        {
            var product = await _context.Orders.FindAsync(request.Id);
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
            var product = await _context.Orders.FindAsync(id);
            if (product == null)
            {
            }
            _context.Remove(product);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}