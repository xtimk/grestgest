using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ActivityController : BaseApiController
    {
        private readonly ILogger<ActivityController> _logger;
        private readonly GrestContext _context;

        public ActivityController(
                ILogger<ActivityController> logger,
                GrestContext context
            )
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ICollection<Activity>> GetAll()
        {
            Thread.Sleep(500);
            var activities = await _context.Activities.Include(x => x.Period).ToListAsync();
            return activities;
        }

        [HttpGet]
        public async Task<Activity> GetFirst()
        {
            var activities = await _context.Activities.Include(x => x.Period).FirstAsync();
            return activities;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]Activity activity)
        {
            _logger.LogInformation("Creating activity.");

            await _context.Activities.AddAsync(activity);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int activityId) {
            var activity_to_delete = await _context.Activities.FindAsync(activityId);
            if(activity_to_delete == null)
            {
                _logger.LogWarning("You tried to delete an activity that does not exists. The id of the non-existent activity is: " + activityId);
                return Ok();
            }
            else
            {
                _logger.LogInformation("Requested the delete of activity with id " + activityId);
                _context.Activities.Remove(activity_to_delete);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }
    }
}