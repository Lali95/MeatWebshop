using System.Collections.Generic;
using System.Linq;
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
            // Adjusting the query since OrderId is removed
            var orderItems = await _context.OrderItems
                .AsQueryable() // Explicitly cast to IQueryable
                .ToListAsync(); // No need to filter by OrderId

            return orderItems;
        }

        // POST: api/orders/{orderId}/items
        [HttpPost("{orderId}/items")]
        public async Task<ActionResult<OrderItem>> AddItemToOrder(int orderId, OrderItem orderItem)
        {
            try
            {
                // Check if order exists (if needed)
                var order = await _context.Orders.FindAsync(orderId);
                if (order == null)
                {
                    return NotFound();
                }

                // Add the order item to the context
                _context.OrderItems.Add(orderItem);

                // Save changes to the database
                await _context.SaveChangesAsync();

                // Return the newly created order item
                return CreatedAtAction(nameof(GetOrderItems), new { orderId = orderId }, orderItem);
            }
            catch (DbUpdateException ex)
            {
                // Log the exception
                return StatusCode(500, $"Error adding item to order: {ex.Message}");
            }
        }

        // PUT: api/orders/{orderId}/items/{itemId}
        [HttpPut("{orderId}/items/{itemId}")]
        public async Task<IActionResult> UpdateOrderItem(int orderId, int itemId, OrderItem orderItem)
        {
            if (itemId != orderItem.Id)
            {
                return BadRequest("Item ID mismatch");
            }

            _context.Entry(orderItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderItemExists(itemId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/orders/{orderId}/items/{itemId}
        [HttpDelete("{orderId}/items/{itemId}")]
        public async Task<IActionResult> DeleteOrderItem(int orderId, int itemId)
        {
            var orderItem = await _context.OrderItems.FindAsync(itemId);
            if (orderItem == null)
            {
                return NotFound();
            }

            _context.OrderItems.Remove(orderItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderItemExists(int itemId)
        {
            return _context.OrderItems.Any(oi => oi.Id == itemId);
        }
    }
}
