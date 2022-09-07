using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ActivitiesController : BaseApiController
    {
        //Listar todas las actividades
        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            Response.Headers.Add("Access-Control-Request-Method","*");
            Response.Headers.Add("Access-Control-Request-Headers","*");
            return HandleResult(await Mediator.Send(new ListAll.Query()));
        }

        //Ver los detalles de una actividad
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Int16 id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        //Edit activity
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Int16 id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        //Delete an activity
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(Int16 id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        //Create an activity
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Activity = activity}));
        }
    }
}