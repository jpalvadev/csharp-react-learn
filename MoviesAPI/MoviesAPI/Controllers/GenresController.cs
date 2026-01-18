using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.Data;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using MoviesAPI.Utilities;

namespace MoviesAPI.Controllers
{
    [Route("api/v1/genres")]
    [ApiController]
    public class GenresController: ControllerBase
    {

       
        private readonly IOutputCacheStore outputCacheStore;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private const string cacheTag = "genres";

        
        public GenresController(IOutputCacheStore outputCacheStore, ApplicationDbContext context, IMapper mapper)
        {
           
            this.outputCacheStore = outputCacheStore;
            this.context = context;
            this.mapper = mapper;
        
        }

        [HttpGet]
        [OutputCache(Tags = [cacheTag])]
        public async Task<List<GenreDTO>> Get([FromQuery] PaginationAndFilterDTO paginationAndFilterDTO)
        {
            var queryable = context.Genres.AsQueryable();

            // metodo aplica: filter -> count -> count en el header -> paginacion. AWAIT!
            var queryFinal = await queryable.PaginateAndFilter(paginationAndFilterDTO, HttpContext);

            return await queryFinal
                .ProjectTo<GenreDTO>(mapper.ConfigurationProvider)
                .ToListAsync();
        }


        [HttpGet("{id:int}", Name = "GetGenreById")]
        [OutputCache(Tags = [cacheTag])]
        public async Task<ActionResult<GenreDTO>> Get(int id)
        {
            GenreDTO? genreDTO = await context.Genres
                .ProjectTo<GenreDTO>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(g => g.Id == id);
            
            if (genreDTO is null)
            {
                return NotFound();
            }

            return genreDTO;

        }

        [HttpPost]
        public async Task<CreatedAtRouteResult> Post([FromBody] CreateGenreDTO createGenreDTO)
        {
            var genre = mapper.Map<Genre>(createGenreDTO);

            context.Add(genre); // marcar para guardar en DB (no se guarda todavia)
            await context.SaveChangesAsync(); // aca si guardamos en DB, hacemos el commit
            await outputCacheStore.EvictByTagAsync(cacheTag, default); // invalidamos cache, para forzar que en un nuevo GET de datos no se use la cache
            var genreDTO = mapper.Map<GenreDTO>(genre);
            return CreatedAtRoute("GetGenreById", new {id = genreDTO.Id}, genreDTO);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateGenreDTO updateGenreDTO)
        {
            var genre = await context.Genres.FirstOrDefaultAsync(g => g.Id == id);

            if (genre is null)
            {
                return NotFound();
            }

            mapper.Map(updateGenreDTO, genre);

            await context.SaveChangesAsync();
            await outputCacheStore.EvictByTagAsync(cacheTag, default);

            return NoContent();
        }

        [HttpDelete("{id:int}")] 
        public async Task<IActionResult> Delete(int id) 
        {
            var deletedRecords = await context.Genres
                .Where(g => g.Id == id)
                .ExecuteDeleteAsync();

            if (deletedRecords == 0)
            {
                return NotFound();
            }

            await outputCacheStore.EvictByTagAsync(cacheTag, default);

            return NoContent();
        }
      
    }
}
