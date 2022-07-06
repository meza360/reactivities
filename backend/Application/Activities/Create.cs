using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Domain;
using System.Threading;
using FluentValidation;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest{
            public Activity? Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
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
                _context.Activities?.Add(request.Activity);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}