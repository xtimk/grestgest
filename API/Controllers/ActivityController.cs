using System;
using System.Collections.Generic;
using System.Linq;
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
            var periods = await _context.Activities.Include(x => x.Period).ToListAsync();
            return periods;
        }

        [HttpGet]
        public async Task<Activity> GetFirst()
        {
            var periods = await _context.Activities.Include(x => x.Period).FirstAsync();
            return periods;
        }
    }
}