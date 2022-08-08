using System.Text.Json.Serialization;

namespace API.Entities
{
    public class Activity : BaseEntity
    {
        [JsonPropertyName("name")]   
        public string Name { get; set; }
        [JsonPropertyName("description")]   
        public string Description { get; set; }
        public int MaxSeats { get; set; }

        // Activity has period as foreign key
        [JsonPropertyName("periodId")]   
        public int PeriodId { get; set; }
        public Period Period { get; set; }
    }
}