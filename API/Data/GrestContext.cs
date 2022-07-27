using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class GrestContext : DbContext
    {
        public GrestContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<Period> Periods { get; set; }
        public DbSet<Interval> Intervals { get; set; }
    }
}