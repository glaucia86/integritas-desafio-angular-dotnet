using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Integritas.Models
{
    public class ProductDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            /* Aqui estou removendo a pluralização da Tabela para evitar erros. Assim encontrará
             * a tabela correta: Product */
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}