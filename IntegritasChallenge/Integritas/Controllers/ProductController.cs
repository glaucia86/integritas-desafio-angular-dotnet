using System.Linq;
using System.Web.Http;
using Integritas.Models;

namespace Integritas.Controllers
{
    [RoutePrefix("api/v1/public")]
    public class ProductController : ApiController
    {
        private readonly ProductDbContext _db = new ProductDbContext();

        /* Método responsável por resgatar todos os Produtos do Banco */
        [HttpGet]
        [Route("products")]
        public IQueryable<Product> GetAllProducts()
        {
            return _db.Products;
        } 

        /* Aqui estarei desconectando a conexão com a base de dados */
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}
