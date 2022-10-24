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
    public class ClientsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ClientsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Clients>> Get()
        {
            return await _context.Client.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<Clients> Get(int id)
        {
            return await _context.Client.SingleOrDefaultAsync(x => x.Id == id);
        }

        [HttpPost]
        public async Task<Clients> Post(Clients request)
        {
            var newClient = request.Adapt<Clients>();
            await _context.AddAsync(newClient);
            await _context.SaveChangesAsync();
            return newClient;
        }
        [HttpPatch]
        public async Task<Clients> Patch(Clients request)
        {
            var Client = await _context.Client.FindAsync(request.Id);
            if (Client == null)
            {
            }
            var UpdateClient = request.Adapt(Client);
            _context.Update(UpdateClient);
            await _context.SaveChangesAsync();
            return UpdateClient;
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var client = await _context.Client.FindAsync(id);
            if (client == null)
            {
            }
            _context.Remove(client);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}