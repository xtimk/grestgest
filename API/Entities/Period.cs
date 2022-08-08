using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Period : BaseEntity
    {
        public string Name { get; set; }
        
        public string Description { get; set; }

        // Explicitely say that activities has a fk on period
        public ICollection<Activity> Activities { get; set; }

        [NotMapped]
        public List<int> IntervalIds { get; set; }
        
        public ICollection<Interval> Intervals { get; set; }
    }
}