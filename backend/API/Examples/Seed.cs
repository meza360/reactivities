using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Persistence;

namespace API.Examples
{
    public class Seed
    {
        public static async Task AddActivities(DataContext context){
            IEnumerable<Activity> activityList = new List<Activity>{
                new Activity{Title="Past Activity 1",Date=DateTime.Now.AddDays(-25),Description="Past Activity",Category="Drinks",City="London",Venue="Pub"},
                new Activity{Title="Past Activity 2",Date=DateTime.Now.AddDays(-20),Description="Past Activity",Category="Culture",City="London",Venue="Holland Park"},
                new Activity{Title="Past Activity 3",Date=DateTime.Now.AddDays(-5),Description="Past Activity",Category="Music",City="London",Venue="Sulgrave"},
                new Activity{Title="Activity 1",Date=DateTime.Now.AddDays(0),Description="Future Activity",Category="Drinks",City="London",Venue="Pennard"},
                new Activity{Title="Future Activity 1",Date=DateTime.Now.AddDays(5),Description="Future Activity",Category="Culture",City="London",Venue="Sterne"},
                new Activity{Title="Future Activity 2",Date=DateTime.Now.AddDays(10),Description="Future Activity",Category="Travel",City="London",Venue="Aldine"},
                new Activity{Title="Future Activity 3",Date=DateTime.Now.AddDays(12),Description="Future Activity",Category="Film",City="London",Venue="Tadmor"},
                new Activity{Title="Future Activity 4",Date=DateTime.Now.AddDays(20),Description="Future Activity",Category="Travel",City="London",Venue="Addison"},
            };
            
            if (context.Activities.Any()) return; //If there are existing activities in db, returns
            
            await context.Activities.AddRangeAsync(activityList); //No else statement needed, guard clause is used 
            await context.SaveChangesAsync();
        }
    }
}