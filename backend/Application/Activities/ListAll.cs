using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Domain;
using System.Threading;
using Persistence;


namespace Application.Activities
{
    public class ListAll
    {
        public class Query : IRequest<List<Activity>>{
            
        }

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
            }

            //Utilizando Metodos de EntityFramework
            async Task<List<Activity>> IRequestHandler<Query, List<Activity>>.Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync();
            }


            //Utilizando comandos de OracleManagedAccess.Client
            /* async Task<List<Activity>> IRequestHandler<Query, List<Activity>>.Handle(Query request, CancellationToken cancellationToken)
            {
                    try
                    {
                    _connection = new OracleConnection(_connectionString);
                    await _connection.OpenAsync();
                    Console.WriteLine("Conexion en la capa de aplicacion");

                    _command = new OracleCommand(_commandString, _connection);
                    _activities = new List<Activity>();

                    OracleDataReader rd = _command.ExecuteReader();
                    Console.WriteLine("Capa aplicacion, metodo ListAll ejecutandose");
                        while (rd.Read()){
                            var activity = new Activity();
                            activity.Id = rd.GetInt16(0);
                            activity.Title=rd.GetString(1);
                            activity.Date=rd.GetDateTime(2);
                            activity.Description=rd.GetString(3);
                            activity.Category = rd.GetString(4);
                            activity.City=rd.GetString(5);
                            activity.Venue=rd.GetString(6);
                            _activities.Add(activity);
                        }
                    Console.WriteLine("Cerrando la conexion");
                    await _connection.CloseAsync();
                    Console.WriteLine("Conexion cerrada");
                    }
                    catch (OracleException err)
                    {
                        foreach (OracleError error in err.Errors) 
                        {
                            Console.WriteLine("Mensaje del error: " + error.Message);
                            Console.WriteLine("Fuente del error: " + error.Source);       
                        }
                    }
                    catch(Exception err)
                    {
                        Console.WriteLine("Error en ",err.Message.ToString());
                    }
            
            return  _activities;
            } */
        }
    }
}