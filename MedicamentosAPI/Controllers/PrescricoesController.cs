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
    [Route("api/Prescricoes")]
    public class PrescricoesController : Controller
    {
        private readonly MedicamentosAPIContext _context;

        public PrescricoesController(MedicamentosAPIContext context)
        {
            _context = context;
        }

        // GET: api/Prescricoes
        [HttpGet]
        public IEnumerable<Prescricao> GetPrescricao()
        {
            return _context.Prescricao;
        }

        // GET: api/Prescricoes/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPrescricao([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var prescricao = await _context.Prescricao.SingleOrDefaultAsync(m => m.PrescricaoId == id);

            if (prescricao == null)
            {
                return NotFound();
            }

            return Ok(prescricao);
        }

        // PUT: api/Prescricoes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrescricao([FromRoute] int id, [FromBody] Prescricao prescricao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != prescricao.PrescricaoId)
            {
                return BadRequest();
            }

            _context.Entry(prescricao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrescricaoExists(id))
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

        // POST: api/Prescricoes
        [HttpPost]
        public async Task<IActionResult> PostPrescricao([FromBody] Prescricao prescricao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Prescricao.Add(prescricao);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPrescricao", new { id = prescricao.PrescricaoId }, prescricao);
        }

        // DELETE: api/Prescricoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrescricao([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var prescricao = await _context.Prescricao.SingleOrDefaultAsync(m => m.PrescricaoId == id);
            if (prescricao == null)
            {
                return NotFound();
            }

            _context.Prescricao.Remove(prescricao);
            await _context.SaveChangesAsync();

            return Ok(prescricao);
        }

        private bool PrescricaoExists(int id)
        {
            return _context.Prescricao.Any(e => e.PrescricaoId == id);
        }
    }
}