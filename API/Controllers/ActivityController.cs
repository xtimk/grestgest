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
        public async Task<IActionResult> Create(string data)
        {
            Activity activity = null;
            try
            {
                activity = JsonSerializer.Deserialize<Activity>(data);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deserializing activity in create.");
            }

            await _context.Activities.AddAsync(activity);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}