using System.Data.Entity;
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

        /* Método responsável por Atualizar o Produto */
        [HttpPut]
        [Route("updateProduct")]
        public HttpResponseMessage UpdateProduct(Product product)
        {
            /* Caso não encontre o Produto, retornar um erro 400 */
            if (product == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            //* Caso não dê erro, criar o Produto na Base de Dados */
            _db.Products.Add(product);
            _db.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        /* Método responsável por Criar um novo produto */
        [HttpPost]
        [Route("postProduct")]
        public HttpResponseMessage CreateProduct(Product product)
        {
            /* Caso não encontre o Produto, retornar um erro 400 */
            if (product == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            //* Caso encontre, retornar o produto */
            _db.Entry(product).State = EntityState.Modified;
            _db.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        /* Método responsável por deletar o Produto pelo id */
        [HttpDelete]
        [Route("deleteProduct/{id:int}")]
        public HttpResponseMessage DeleteProduct(int id)
        {
            /* Caso não encontre o Produto, retornar um erro 400 */
            if (id <= 0)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            //* Caso encontre, remover o produto */
            var product = _db.Products.Find(id);
            _db.Products.Remove(product);
            _db.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK);
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
