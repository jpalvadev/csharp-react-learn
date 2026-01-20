using AutoMapper;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;

namespace MoviesAPI.Utilities
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            ConfigureGenres();
            ConfigureActors();
        }

        private void ConfigureGenres()
        {
            CreateMap<CreateGenreDTO, Genre>();
            CreateMap<UpdateGenreDTO, Genre>();
            CreateMap<Genre, GenreDTO>();
        }

        private void ConfigureActors()
        {
            // ignoramos el field Picture, porque no se puede mapear un file a string y viceversa
            CreateMap<CreateActorDTO, Actor>()
                .ForMember(x => x.Picture, options => options.Ignore());
            CreateMap<Actor, ActorDTO>(); // lo usamos en un GET por ejemplo, en el ProjectTo
        }
    }
}
