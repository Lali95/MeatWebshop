using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class Order
{
    [Key]
    public int Id { get; set; }

    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}