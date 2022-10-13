using System;
using System.Threading.Tasks;
using MediatR;
using Domain;
using System.Threading;
using Persistence;
using Application.Core;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<Activity>>
        {
            public Int16 Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            async public Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<Activity>.Success(await _context.Activities.FindAsync(request.Id));
            }
        }


    }
}