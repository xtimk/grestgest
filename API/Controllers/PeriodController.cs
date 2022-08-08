using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class PeriodController : BaseApiController
    {
        private readonly ILogger<PeriodController> _logger;
        private readonly GrestContext _context;

        public PeriodController(
                ILogger<PeriodController> logger,
                GrestContext context
            )
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ICollection<Period>> GetAll()
        {
            Thread.Sleep(500);
            var periods = await _context.Periods.Include(x => x.Intervals).ToListAsync();
            return periods;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]Period period)
        {
            _logger.LogInformation("Requested creation of a new period.");

            var linkedIntervals = new List<Interval>();
            foreach (var itemId in period.IntervalIds)
            {
                var interval_to_add = await _context.Intervals.FindAsync(itemId);
                linkedIntervals.Add(interval_to_add);
            }
            period.Intervals = linkedIntervals;

            await _context.Periods.AddAsync(period);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Period successfully created.");

            return Ok();
        }
    }
}