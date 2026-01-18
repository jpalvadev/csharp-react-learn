using MoviesAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Entities
{
    public class Genre
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Te falta el {0} nene")] // {0} es el nombre del field (Name)
        [StringLength(50)]
        [MinLength(3)]
        [FirtsLetterUppercase]
        public required string Name { get; set; }

        
    }
}
