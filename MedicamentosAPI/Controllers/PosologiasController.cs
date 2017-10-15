using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedicamentosAPI.Models;
using MedicamentosAPI.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace MedicamentosAPI.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Produces("application/json")]
    [Route("api/Posologia")]
    public class PosologiasController : Controller
    {
        private readonly MedicamentosAPIContext _context;

        public PosologiasController(MedicamentosAPIContext context)
        {
            _context = context;
        }

        // GET: api/Posologias
        [HttpGet]
        public IEnumerable<PosologiaDTO> GetPosologia()
        {
            return _context.Posologia.Select(m => new PosologiaDTO(m));
        }

        // GET: api/Posologias/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPosologia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var posologia = await _context.Posologia.SingleOrDefaultAsync(m => m.PosologiaId == id);

            if (posologia == null)
            {
                return NotFound();
            }

            PosologiaDTO dto = new PosologiaDTO(posologia);

            return Ok(dto);
        }


        // GET: api/Medicamentos/3/Posologias
        [Route("~/api/Medicamento/{id}/Posologias")]
        public async Task<IActionResult> GetPosologiasMedicamento([FromRoute]int Id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
   
            List<Apresentacao> apres_med_pos = await _context.Apresentacao.Include(a => a.Farmaco).Where(b => b.MedicamentoId == Id).ToListAsync();
            List<PosologiaIdDTO> lista_posologias = new List<PosologiaIdDTO>();

            foreach (Apresentacao a in apres_med_pos.ToList())
            {
                lista_posologias.Add(new PosologiaIdDTO(a.Posologia_GenericaId));
            }

            if (lista_posologias == null)
            {
                return NotFound();
            }

            return Ok(lista_posologias);

        }

        // PUT: api/Posologias/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPosologia([FromRoute] int id, [FromBody] Posologia posologia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != posologia.PosologiaId)
            {
                return BadRequest();
            }

            _context.Entry(posologia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PosologiaExists(id))
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

        // POST: api/Posologias
        [HttpPost]
        public async Task<IActionResult> PostPosologia([FromBody] Posologia posologia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Posologia.Add(posologia);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPosologia", new { id = posologia.PosologiaId }, posologia);
        }

        // DELETE: api/Posologias/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePosologia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var posologia = await _context.Posologia.SingleOrDefaultAsync(m => m.PosologiaId == id);
            if (posologia == null)
            {
                return NotFound();
            }

            _context.Posologia.Remove(posologia);
            await _context.SaveChangesAsync();

            return Ok(posologia);
        }

        private bool PosologiaExists(int id)
        {
            return _context.Posologia.Any(e => e.PosologiaId == id);
        }
    }
}