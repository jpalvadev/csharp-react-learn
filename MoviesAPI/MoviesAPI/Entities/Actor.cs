using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Entities
{
    public class Actor
    {
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public required string Name { get; set; }

        public DateTime DateOfBirth { get; set; }

        [Unicode(false)] // como es una URL no es necesario todo el Unicode, hacemos esto para ahorrar espacio
         public string? Picture { get; set; }
    }
}
