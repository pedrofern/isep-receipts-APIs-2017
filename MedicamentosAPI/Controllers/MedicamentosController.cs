using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedicamentosAPI.Models;
using System.Linq.Expressions;
using MedicamentosAPI.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace MedicamentosAPI.Controllers
{
    //[Authorize(AuthenticationSchemes = "Bearer")]
    [Produces("application/json")]
    [Route("api/Medicamento")]
    public class MedicamentosController : Controller
    {
        private readonly MedicamentosAPIContext _context;

        public MedicamentosController(MedicamentosAPIContext context)
        {
            _context = context;
        }

        // GET: api/Medicamentos
        [HttpGet]
        public IEnumerable<MedicamentoDTO> GetMedicamento()
        {
            return _context.Medicamento.Select(m => new MedicamentoDTO(m));
        }

        // GET: api/Medicamentos/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMedicamento([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicamento = await _context.Medicamento.SingleOrDefaultAsync(m => m.MedicamentoId == id);

            if (medicamento == null)
            {
                return NotFound();
            }

            MedicamentoDTO dto = new MedicamentoDTO(medicamento);

            return Ok(dto);
        }

        // GET: api/Medicamentos/nome="{nome}"
        [HttpGet("nome=\"{nome}\"")]
        public IActionResult GetMedicamentoByNome([FromRoute] string nome)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicamento = _context.Medicamento.Select(m => new MedicamentoDTO(m)).Where(m => m.nome == nome);

            if (medicamento == null)
            {
                return NotFound();
            }

            return Ok(medicamento);
        }

        // PUT: api/Medicamentos/{id}
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedicamento([FromRoute] int id, [FromBody] Medicamento medicamento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != medicamento.MedicamentoId)
            {
                return BadRequest();
            }

            _context.Entry(medicamento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicamentoExists(id))
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

        // POST: api/Medicamentos
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost]
        public async Task<IActionResult> PostMedicamento([FromBody] Medicamento medicamento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Medicamento.Add(medicamento);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMedicamento", new { id = medicamento.MedicamentoId }, medicamento);
        }

        // DELETE: api/Medicamentos/{id}
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedicamento([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicamento = await _context.Medicamento.SingleOrDefaultAsync(m => m.MedicamentoId == id);
            if (medicamento == null)
            {
                return NotFound();
            }

            _context.Medicamento.Remove(medicamento);
            await _context.SaveChangesAsync();

            return Ok(medicamento);
        }

        private bool MedicamentoExists(int id)
        {
            return _context.Medicamento.Any(e => e.MedicamentoId == id);
        }
    }
}