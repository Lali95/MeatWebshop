using Microsoft.AspNetCore.Identity;

namespace Backend.Model;

public class ApplicationUser : IdentityUser
{ 
    public DateTime BirthDate { get; set; }
    public string Address { get; set; }
    public decimal Balance { get; set; }
    public bool IsActive { get; set; }
    private ICollection<OrderItem> _cart;
    private readonly ICollection<Order> _orders;
   

    public ApplicationUser()
    {
    }
    public ApplicationUser(DateTime birthDate, string password, string address)
    {
        BirthDate = birthDate;
        Address = address;
        Balance = 0;
        IsActive = true;
        _cart = new List<OrderItem>();
        _orders = new List<Order>();
    
    }
    
    public void AddOrder(Order order)
    {
        _orders.Add(order);
    }

    public IEnumerable<Order> GetOrders()
    {
        return _orders;
    }



   
}