using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Application.Activities;

namespace API.Controllers
{
    [ApiController]
    public class ActivitiesController : BaseApiController
    {
        
        //Listar todas las actividades
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities(){
            Response.Headers.Add("Access-Control-Request-Method","*");
            Response.Headers.Add("Access-Control-Request-Headers","*");
            return await Mediator.Send(new ListAll.Query());
        }

        //Ver los detalles de una actividad
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Int16 id){
            return await Mediator.Send(new Details.Query{Id = id});
        }

        //Editar actividades
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Int16 id, Activity activity){
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        //Eliminar una actividad
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(Int16 id){
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }

        //Crear una actividad
        [HttpPost]
        public async Task<ActionResult> CreateActivity(Activity activity){
            return Ok(await Mediator.Send(new Create.Command{Activity = activity}));
        }
    }
}