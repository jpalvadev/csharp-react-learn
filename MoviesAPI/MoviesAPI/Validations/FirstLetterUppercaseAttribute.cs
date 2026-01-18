using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Validations
{
    public class FirtsLetterUppercaseAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is null || string.IsNullOrWhiteSpace(value.ToString()))
            {
                return ValidationResult.Success; // no corresponde a este validator chequear si value viene vacio
            }

            char firstLetterChar = value.ToString()![0];
            string firstLetter = firstLetterChar.ToString();

            if (firstLetter != firstLetter.ToUpper())
            {
                return new ValidationResult("The first letter must be uppercase");
            }

            return ValidationResult.Success;
        }
    }
}