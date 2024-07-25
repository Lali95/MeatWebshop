using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Model;

public class OrderItem
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public decimal Price { get; set; }

    [Required]
    public int Quantity { get; set; }

    [Required]
    public string Type { get; set; }  

    [Required]
    public int OrderId { get; set; }  // Make sure this is marked as [Required]

    [ForeignKey("OrderId")]
    public Order Order { get; set; }
}