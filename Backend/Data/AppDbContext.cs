using Microsoft.EntityFrameworkCore;
using Backend.Model;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        // Constructor
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Configure models in OnModelCreating
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Order entity
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(o => o.Id);
                entity.Property(o => o.OrderSum).HasColumnType("decimal(18,2)");

                // Since OrderItem no longer has a foreign key to Order, this configuration is removed
                // entity.HasMany(o => o.OrderItems)
                //     .WithOne() // No navigation property in OrderItem
                //     .HasForeignKey(oi => oi.OrderId)
                //     .OnDelete(DeleteBehavior.Restrict); // Specify OnDelete behavior
            });

            // Configure OrderItem entity
            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.HasKey(oi => oi.Id);
                entity.Property(oi => oi.Name).IsRequired().HasMaxLength(100);
                entity.Property(oi => oi.Type).IsRequired().HasMaxLength(50);
                entity.Property(oi => oi.Price).IsRequired().HasColumnType("decimal(18,2)");
                entity.Property(oi => oi.Quantity).IsRequired();
                
                // No need to configure a foreign key relationship with Order
            });
        }
    }
}