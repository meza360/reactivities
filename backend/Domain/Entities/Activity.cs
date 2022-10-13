using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Domain
{
    public class Activity
    {
        [Key]
        public Int16? Id { get; set; }
        public string? Title { get; set; }
        
        [Column(TypeName ="Date")]
        public DateTime Date { get; set; }
        public string Description { get; set; } = String.Empty;
        public string Category { get; set; } = String.Empty;
        public string City { get; set; } = String.Empty;
        public string Venue { get; set; } = String.Empty;
    }
}