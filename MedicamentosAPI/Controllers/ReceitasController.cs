using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedicamentosAPI.Models;

namespace MedicamentosAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/Receitas")]
    public class ReceitasController : Controller
    {
        private readonly MedicamentosAPIContext _context;

        public ReceitasController(MedicamentosAPIContext context)
        {
            _context = context;
        }

        // GET: api/Receitas
        [HttpGet]
        public IEnumerable<Receita> GetReceita()
        {
            return _context.Receita;
        }

        // GET: api/Receitas/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetReceita([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var receita = await _context.Receita.SingleOrDefaultAsync(m => m.ReceitaId == id);

            if (receita == null)
            {
                return NotFound();
            }

            return Ok(receita);
        }

        // PUT: api/Receitas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReceita([FromRoute] int id, [FromBody] Receita receita)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != receita.ReceitaId)
            {
                return BadRequest();
            }

            _context.Entry(receita).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReceitaExists(id))
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

        // POST: api/Receitas
        [HttpPost]
        public async Task<IActionResult> PostReceita([FromBody] Receita receita)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Receita.Add(receita);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReceita", new { id = receita.ReceitaId }, receita);
        }

        // DELETE: api/Receitas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceita([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var receita = await _context.Receita.SingleOrDefaultAsync(m => m.ReceitaId == id);
            if (receita == null)
            {
                return NotFound();
            }

            _context.Receita.Remove(receita);
            await _context.SaveChangesAsync();

            return Ok(receita);
        }

        private bool ReceitaExists(int id)
        {
            return _context.Receita.Any(e => e.ReceitaId == id);
        }
    }
}