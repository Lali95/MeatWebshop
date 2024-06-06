namespace Backend.Model
{
    public class Order
    {
        public int Id { get; set; }
        public decimal OrderSum { get; set; } // Define OrderSum property

        // Navigation property
        public ICollection<OrderItem> OrderItems { get; set; }
    }
}