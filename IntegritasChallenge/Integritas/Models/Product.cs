using System.ComponentModel.DataAnnotations;

namespace Integritas.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        public string ProductName { get; set; }

        public string ProductType { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }

    }
}