namespace API.Entities
{
    public class Activity : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }

        // Activity has period as foreign key
        public int PeriodId { get; set; }
        public Period Period { get; set; }
    }
}