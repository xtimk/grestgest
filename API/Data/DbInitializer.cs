using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(GrestContext context, ILogger logger)
        {

            // await CleanDatabase(context);

            if (!await IsDbEmpty(context))
            {
                logger.LogInformation("Database is not empty. Will not seed database");
                return;
            }

            await InitializePeriods(context);
            await InitializeIntervals(context);
            await InitializeIntervalPeriod(context);
            await InitializeActivities(context);
        }

        private static async Task InitializeIntervals(GrestContext context)
        {
            var intervals = new List<Interval>
            {
                new Interval()
                {
                    Name = "Lunedi Mattina",
                    Day = DayOfWeek.Monday,
                    StartingTime = new TimeOnly(9,0),
                    EndingTime = new TimeOnly(13,0)
                },
                new Interval()
                {
                    Name = "Lunedi Pomeriggio",
                    Day = DayOfWeek.Monday,
                    StartingTime = new TimeOnly(14,0),
                    EndingTime = new TimeOnly(17,0)
                },
                new Interval()
                {
                    Name = "Martedi Mattina",
                    Day = DayOfWeek.Tuesday,
                    StartingTime = new TimeOnly(14,0),
                    EndingTime = new TimeOnly(17,0)
                },
                new Interval()
                {
                    Name = "Martedi Pomeriggio",
                    Day = DayOfWeek.Tuesday,
                    StartingTime = new TimeOnly(14,0),
                    EndingTime = new TimeOnly(17,0)
                },
                new Interval()
                {
                    Name = "Mercoledi Mattina",
                    Day = DayOfWeek.Wednesday,
                    StartingTime = new TimeOnly(9,0),
                    EndingTime = new TimeOnly(13,0)
                },
                new Interval()
                {
                    Name = "Mercoledi Pomeriggio",
                    Day = DayOfWeek.Wednesday,
                    StartingTime = new TimeOnly(14,0),
                    EndingTime = new TimeOnly(17,0)
                },
            };

            foreach (var item in intervals)
            {
                await context.Intervals.AddAsync(item);
            }
            await context.SaveChangesAsync();
        }

        private static async Task InitializePeriods(GrestContext context)
        {
            var periods = new List<Period>
            {
                new Period()
                {
                    Name = "Lunedi/Mercoledi mattina",
                    Description = "Periodo lunedi/mercoledi mattina",
                    Intervals = new List<Interval>()
                }
            };

            foreach (var item in periods)
            {
                await context.Periods.AddAsync(item);
            }
            await context.SaveChangesAsync();
        }

        private static async Task InitializeIntervalPeriod(GrestContext context)
        {
            var period_lun_mer = await context.Periods.OrderBy(x => x.Name).FirstAsync();

            var interval_lun_mat = await context.Intervals.OrderBy(x => x.Name).FirstAsync(x => x.Name == "Lunedi Mattina");
            var interval_mer_mat = await context.Intervals.OrderBy(x => x.Name).FirstAsync(x => x.Name == "Mercoledi Mattina");

            period_lun_mer.Intervals.Add(interval_lun_mat);
            period_lun_mer.Intervals.Add(interval_mer_mat);

            await context.SaveChangesAsync();

        }

        private static async Task InitializeActivities(GrestContext context)
        {

            var period_lun_mer_mattina = await context.Periods.OrderBy(x => x.Name).FirstAsync(x => x.Name == "Lunedi-Mercoledi mattina");

            var calcio_bambini = new Activity()
            {
                Name = "Calcio bambini",
                Description = "Fino a 3a elementare",
                Period = period_lun_mer_mattina
            };

            await context.Activities.AddAsync(calcio_bambini);
            await context.SaveChangesAsync();
        }

        private static async Task<bool> IsDbEmpty(GrestContext context)
        {
            return (
                !await context.Activities.AnyAsync() &&
                !await context.Periods.AnyAsync() &&
                !await context.Intervals.AnyAsync()
            );
        }

        private static async Task CleanDatabase(GrestContext context)
        {
            await context.Database.ExecuteSqlRawAsync("DELETE FROM Activities");
            await context.Database.ExecuteSqlRawAsync("DELETE FROM Intervals");
            await context.Database.ExecuteSqlRawAsync("DELETE FROM Periods");        
        }
    }
}