namespace MoviesAPI.DTOs
{
    public record GenreDTO
    {
        public int Id { get; init; }
        public string Name { get; init; } = string.Empty;
    }
}
