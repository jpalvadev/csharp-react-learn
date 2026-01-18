using MoviesAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.DTOs
{
    public record CreateGenreDTO
    {
        [Required(ErrorMessage = "Genre Name is required")]
        [MinLength(3, ErrorMessage = "Genre Name must have at least 3 letters")]
        [MaxLength(50, ErrorMessage = "No te zarpes, gato, 50 chars max")]
        [FirtsLetterUppercase]
        public string Name { get; init; } = string.Empty;
    }

}
