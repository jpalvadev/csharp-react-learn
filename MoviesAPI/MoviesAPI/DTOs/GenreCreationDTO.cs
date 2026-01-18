using MoviesAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.DTOs
{
    public class GenreCreationDTO
    {
        [Required(ErrorMessage = "Te falta el {0} nene")] // {0} es el nombre del field (Name)
        [StringLength(50)]
        [MinLength(3)]
        [FirtsLetterUppercase]
        public required string Name { get; set; }
    }
}
