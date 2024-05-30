using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Model;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/orders/{orderId}/items
        [HttpGet("{orderId}/items")]
        public async Task<ActionResult<List<OrderItem>>> GetOrderItems(int orderId)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null)
            {
                return NotFound();
            }

            return order.OrderItems;
        }

        // POST: api/orders/{orderId}/items
        [HttpPost("{orderId}/items")]
        public async Task<ActionResult<OrderItem>> AddItemToOrder(int orderId, OrderItem orderItem)
        {
            var order = await _context.Orders.FindAsync(orderId);

            if (order == null)
            {
                return NotFound();
            }

            orderItem.OrderId = orderId;
            _context.OrderItems.Add(orderItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderItems), new { orderId = orderId }, orderItem);
        }
    }
}