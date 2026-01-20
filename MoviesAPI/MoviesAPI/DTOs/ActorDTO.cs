using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.DTOs
{
    public record ActorDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string? Picture { get; set; }
    }
}
