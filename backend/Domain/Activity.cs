using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Oracle.EntityFrameworkCore.Design;


namespace Domain
{
    public class Activity
    {
        [Key]
        public Int16 Id { get; set; }
        public string Title { get; set; }
        
        [Column(TypeName ="Date")]
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
    }
}