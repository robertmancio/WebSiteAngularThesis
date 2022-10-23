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
    public class ProductCategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductCategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Product>> Get()
        {
            return await _context.Products.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<Product> Get(int id)
        {
            return await _context.Products.SingleOrDefaultAsync(x => x.Id == id);
        }

        [HttpPost]
        public async Task<Product> Post(CreateProduct request)
        {
            var newProduct = request.Adapt<Product>();
            await _context.AddAsync(newProduct);
            await _context.SaveChangesAsync();
            return newProduct;
        }
        [HttpPatch]
        public async Task<Product> Patch(UpdateProduct request)
        {
            var product = await _context.Products.FindAsync(request.id);
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