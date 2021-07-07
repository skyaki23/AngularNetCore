using BEDev.Models;
using Microsoft.EntityFrameworkCore;

namespace BEDev
{
    public class ItemDbContext: DbContext
    {
        public DbSet<Item> Item { get; set; }

        public ItemDbContext(DbContextOptions<ItemDbContext> options): base(options)
        {

        }
    }
}
