using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain;
using Persistence;
using MediatR;
using System.Threading;
using Application.Core;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Int16 Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            async public Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                //Commented next line to test exceptions handle
                /* if(activity == null) return null; */

                _context.Remove(activity);
                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Activity deletion failed");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}