using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Oracle.ManagedDataAccess.Client;

namespace API.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        //private readonly ILogger<BaseApiController> _logger;
        //protected string ConnectionString = "User Id=GMEZAP; Password=developer;Data Source=//oddbbsrv01.sti-gt.local:1521/stigtpdb1";

        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        protected OracleConnection _sharedConnection;

    }
}