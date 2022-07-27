using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Interval : BaseEntity
    {
        public string Name { get; set; }
        public DayOfWeek Day { get; set; }
        public TimeOnly StartingTime { get; set; }
        public TimeOnly EndingTime { get; set; }

        public ICollection<Period> Periods { get; set; }
    }
}