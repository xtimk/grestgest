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
            var periods = await _context.Periods.Include(x => x.Intervals).ToListAsync();
            return periods;
        }
    }
}