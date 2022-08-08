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

        [HttpDelete]
        public async Task<IActionResult> Delete(int id) {
            _logger.LogInformation("Requested the delete of the interval with id " + id);
            var period_to_delete = await _context.Periods.Include(x => x.Activities).FirstOrDefaultAsync(item=> item.Id == id);
            if(period_to_delete == null)
            {
                _logger.LogWarning("Requested a delete of an interval that does not exists. The id of the non-existent activity is: " + id);
                return Ok();
            }

            if(period_to_delete.Activities.Any())
            {
                var activities = string.Join(", ", period_to_delete.Activities.Select(x=> x.Name).ToArray());
                _logger.LogInformation("Requested a delete of a period that is linked to at least one activity. Linked activities: " + activities);
                return BadRequest(new ProblemDetails(){
                    Title = "Impossibile cancellare il periodo",
                    Detail = "E' utilizzato dalle seguenti attivita: " + activities
                });
            }

            _context.Periods.Remove(period_to_delete);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Successfull deleted period with id " + id);

            return Ok();
        }
    }
}