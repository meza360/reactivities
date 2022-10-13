using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Domain;
using System.Threading;
using Persistence;
using Application.Core;

namespace Application.Activities
{
    public class ListAll
    {
        public class Query : IRequest<Result<List<Activity>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }
            //Utilizando Metodos de EntityFramework
            async Task<Result<List<Activity>>> IRequestHandler<Query, Result<List<Activity>>>.Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Activity>>.Success(await _context.Activities.ToListAsync());
            }
        }
    }
}