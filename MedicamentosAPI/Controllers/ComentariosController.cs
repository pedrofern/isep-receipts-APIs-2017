using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedicamentosAPI.Models;
using Microsoft.AspNetCore.Authorization;
using MedicamentosAPI.DTOs;

namespace MedicamentosAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/Comentario")]
    public class ComentariosController : Controller
    {
        private readonly MedicamentosAPIContext _context;

        public ComentariosController(MedicamentosAPIContext context)
        {
            _context = context;
        }

        // GET: api/Comentario
        [HttpGet]
        public IEnumerable<ComentarioDTO> GetComentario()
        {
            return _context.Comentario.Select(c => new ComentarioDTO(c));
        }

        // GET: api/Comentario/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetComentario([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var comentario = await _context.Comentario.SingleOrDefaultAsync(m => m.ComentarioId == id);

            if (comentario == null)
            {
                return NotFound();
            }

            ComentarioDTO dto = new ComentarioDTO(comentario);

            return Ok(dto);
        }

        // GET: api/Apresentacao/{id}/Comentario
        [Route("~/api/Apresentacao/{id}/Comentarios")]
        public IActionResult GetComentariosApresentacao([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IQueryable<Comentario> comentarios = _context.Comentario.Include(a => a.Apresentacao).Where(a => a.ApresentacaoId == id);

            List<ComentarioDTO> lista_comentarios = new List<ComentarioDTO>();

            foreach (Comentario c in comentarios.ToList())
            {
                lista_comentarios.Add(new ComentarioDTO(c));
            }

            if (lista_comentarios == null)
            {
                return NotFound();
            }

            return Ok(lista_comentarios);
        }

        // PUT: api/Comentario/5
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComentario([FromRoute] int id, [FromBody] Comentario comentario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != comentario.ComentarioId)
            {
                return BadRequest();
            }

            _context.Entry(comentario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComentarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Comentario
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost]
        public async Task<IActionResult> PostComentario([FromBody] Comentario comentario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Comentario.Add(comentario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComentario", new { id = comentario.ComentarioId }, comentario);
        }

        // DELETE: api/Comentario/5
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComentario([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var comentario = await _context.Comentario.SingleOrDefaultAsync(m => m.ComentarioId == id);
            if (comentario == null)
            {
                return NotFound();
            }

            _context.Comentario.Remove(comentario);
            await _context.SaveChangesAsync();

            return Ok(comentario);
        }

        private bool ComentarioExists(int id)
        {
            return _context.Comentario.Any(e => e.ComentarioId == id);
        }
    }
}