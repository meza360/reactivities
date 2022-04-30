using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Oracle.ManagedDataAccess.Client;
using MediatR;
using Domain;
using System.Threading;
using Persistence;

namespace Application.Activities
{
    public class Details
    {

        // variables de sentencias
        
        public class Query : IRequest<Activity>{
            public Int16 Id { get; set; }
            //public OracleConnection Connection { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            async public Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
               
                var activity = await _context.Activities.FindAsync(request.Id);
                return activity;
            }
        }


    }
}