namespace ToysStore.Controllers.Entities
{
    public class Toy
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public string Description { get; set; }

        public int AgeRestriction { get; set; }

        public string Company { get; set; }

        public float Price { get; set; }

    }
}
