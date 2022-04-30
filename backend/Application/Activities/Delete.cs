using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain;
using Persistence;
using MediatR;
using System.Threading;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest{
            public Int16 Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            async public Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var candidate = await _context.Activities.FindAsync(request.Id);
                _context.Remove(candidate);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}