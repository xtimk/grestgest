using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class IntervalController : BaseApiController
    {
        private readonly GrestContext _context;
        private readonly ILogger<Interval> _logger;
        public IntervalController(
                GrestContext context,
                ILogger<Interval> logger
        )
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ICollection<Interval>> GetAll()
        {
            _logger.LogInformation("Getting all intervals.");
            Thread.Sleep(500);
            var periods = await _context.Intervals.ToListAsync();
            return periods;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]Interval interval)
        {
            _logger.LogInformation("Creating interval.");

            await _context.Intervals.AddAsync(interval);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}