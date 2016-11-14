using System.Web.Http;
using Integritas.Models;

namespace Integritas.Controllers
{
    [RoutePrefix("api/v1/public")]
    public class ProductController : ApiController
    {
        private readonly ProductDbContext _db = new ProductDbContext();

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
