using System.ComponentModel.DataAnnotations;

namespace BEDev.Models
{
    public class Item
    {
        public int Id { get; set; }
        [Required]
        public string BrandName { get; set; }
        [Required]
        public string Processor { get; set; }
        [Required]
        public string MainMemory { get; set; }
        [Required]
        public string HardDrive { get; set; }
        [Required]
        public string GraphicsCard { get; set; }
        [Required]
        public string ScreenSize { get; set; }
        [Required]
        public int Price { get; set; }
    }
}
