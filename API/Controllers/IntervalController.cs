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
            _logger.LogInformation("Requested creation of a new interval.");

            await _context.Intervals.AddAsync(interval);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Interval successfully created.");

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id) {
            _logger.LogInformation("Requested the delete of the interval with id " + id);
            var interval_to_delete = await _context.Intervals.Include(x => x.Periods).FirstOrDefaultAsync(item=> item.Id == id);
            if(interval_to_delete == null)
            {
                _logger.LogWarning("Requested a delete of an interval that does not exists. The id of the non-existent activity is: " + id);
                return Ok();
            }

            if(interval_to_delete.Periods.Any())
            {
                var periods = string.Join(", ", interval_to_delete.Periods.Select(x=> x.Name).ToArray());
                _logger.LogInformation("Requested a delete of an interval that is linked to at least one period. Linked periods: " + periods);
                return BadRequest(new ProblemDetails(){
                    Title = "Impossibile cancellare l'intervallo",
                    Detail = "E' utilizzato dai seguenti periodi: " + periods
                });
            }

            _context.Intervals.Remove(interval_to_delete);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Successfull deleted interval with id " + id);

            return Ok();
        }
    }
}