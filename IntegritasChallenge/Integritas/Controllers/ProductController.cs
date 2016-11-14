using System.Linq;
using System.Net;
using System.Net.Http;
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

        /* Método responsável por Buscar Produto por id */
        [HttpGet]
        [Route("product/{id:int}")]
        public HttpResponseMessage GetById(int id)
        {
            if (id <= 0)
                /* Caso não encontre o id do Produto, retornar um erro 400 */
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            /* Caso encontre, retornar o id do produto */
            var product = _db.Products.Find(id);

            return Request.CreateResponse(HttpStatusCode.OK, product);
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
