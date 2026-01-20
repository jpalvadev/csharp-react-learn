using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.Data;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using MoviesAPI.Services;
using MoviesAPI.Utilities;

namespace MoviesAPI.Controllers
{
    [Route("api/v1/actors")]
    [ApiController]
    public class ActorsController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IOutputCacheStore outputCacheStore;
        private readonly IFileStorage fileStorage;
        private const string cacheTag = "actors";
        private readonly string container = "actors";

        public ActorsController(ApplicationDbContext context, IMapper mapper, IOutputCacheStore outputCacheStore, IFileStorage fileStorage)
        {
            this.context = context;
            this.mapper = mapper;
            this.outputCacheStore = outputCacheStore;
            this.fileStorage = fileStorage;
        }

        [HttpGet]
        [OutputCache(Tags = [cacheTag])]
        public async Task<List<ActorDTO>> Get([FromQuery] PaginationAndFilterDTO paginationAndFilterDTO) {
            var queryable = context.Actors.AsQueryable();

            // metodo aplica: filter -> count -> count en el header -> paginacion. AWAIT!
            var queryFinal = await queryable.PaginateAndFilter(paginationAndFilterDTO, HttpContext);

            return await queryFinal
                .ProjectTo<ActorDTO>(mapper.ConfigurationProvider)
                .ToListAsync();
        }

        [HttpGet("{id:int}", Name = "GetActorById")]
        [OutputCache(Tags = [cacheTag])]
        public async Task<ActionResult<ActorDTO>> Get(int id)
        {
            var actor = await context.Actors
                .ProjectTo<ActorDTO>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(actor => actor.Id == id);

            if (actor is null)
            {
                return NotFound();
            }

            return actor;
        }

        [HttpPost]
        public async Task<CreatedAtRouteResult> Post([FromForm] CreateActorDTO createActorDTO)
        {
            
            var actor = mapper.Map<Actor>(createActorDTO);

            if (createActorDTO.Picture is not null)
            {
                var url = await fileStorage.Store(container, createActorDTO.Picture);
                actor.Picture = url;
            }

            context.Add(actor);
            await context.SaveChangesAsync();
            await outputCacheStore.EvictByTagAsync(cacheTag, default);
            var actorDTO = mapper.Map<ActorDTO>(actor);

            return CreatedAtRoute("GetActorById", new { id = actor.Id }, actorDTO);
        }

        [HttpPut("{id:int}")]
        [OutputCache(Tags = [cacheTag])]
        public async Task<IActionResult> Put(int id, [FromForm] CreateActorDTO createActorDTO)
        {
            var actor = await context.Actors.FirstOrDefaultAsync(actor => actor.Id == id);
            if (actor is null) 
            { 
                return NotFound(); 
            }

            actor = mapper.Map(createActorDTO,actor);

            if (createActorDTO.Picture is not null)
            {
                actor.Picture = await fileStorage.Edit(actor.Picture, container, createActorDTO.Picture);
            }

            await context.SaveChangesAsync();
            await outputCacheStore.EvictByTagAsync(cacheTag, default);
            return NoContent();

        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var actor = await context.Actors.FirstOrDefaultAsync(actor => actor.Id == id);

            if (actor is null)
            {
                return NotFound();
            }

            context.Remove(actor);
            await context.SaveChangesAsync();
            await outputCacheStore.EvictByTagAsync(cacheTag, default);
            await fileStorage.Delete(actor.Picture, container);

            return NoContent();
        }
    }
}
