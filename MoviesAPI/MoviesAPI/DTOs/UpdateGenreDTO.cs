using MoviesAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.DTOs
{
    public record UpdateGenreDTO
    {
        [MinLength(3, ErrorMessage = "Genre Name must have at least 3 letters")]
        [MaxLength(50, ErrorMessage = "50 chars max")]
        [FirtsLetterUppercase]
        public string Name { get; init; } = string.Empty;
    }
}
