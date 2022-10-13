using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ActivityAttendee
    {
        public string AppUserId { get; set; } = String.Empty;
        public AppUser? AppUser { get; set; } = null;
        public int? ActivityId { get; set; } = null;
        public Activity? Activity { get; set; } = null;
        public bool IsHost { get; set; }
    }
}