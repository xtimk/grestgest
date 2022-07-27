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
            var periods = await _context.Intervals.ToListAsync();
            return periods;
        }
    }
}