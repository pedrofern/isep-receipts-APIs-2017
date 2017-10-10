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

namespace MedicamentosAPI.Controllers
{
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

        // GET: api/Medicamentos/5
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

        // GET: api/Medicamento/5/Apresentacoes
        [HttpGet("{id}/Apresentacoes")]
        public async Task<IActionResult> GetApresentacoesDoMedicamento([FromRoute] int id)
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

            var apresentacoes = _context.Apresentacao.Select(a => new ApresentacaoIdDTO(a)).Where(a => id == medicamento.MedicamentoId);

            if (apresentacoes == null)
            {
                return NotFound();
            }

            return Ok(apresentacoes);
        }

        // GET: api/Medicamento/5/Posologias
        [HttpGet("{id}/Posologias")]
        public async Task<IActionResult> GetPosologiasDoMedicamento([FromRoute] int id)
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

            var posologias = _context.Posologia.Select(p => new PosologiaIdDTO(p)).Where(p => id == medicamento.MedicamentoId);

            if (posologias == null)
            {
                return NotFound();
            }

            return Ok(posologias);
        }

        // GET: api/Medicamentos/nome="{nome}"
        [HttpGet("nome=\"{nome}\"")]
        public async Task<IActionResult> GetMedicamentoByNome([FromRoute] string nome)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicamento = await _context.Medicamento.SingleOrDefaultAsync(m => m.nome == nome);

            if (medicamento == null)
            {
                return NotFound();
            }

            MedicamentoDTO dto = new MedicamentoDTO(medicamento);

            return Ok(dto);
        }

        // PUT: api/Medicamentos/5
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

        // DELETE: api/Medicamentos/5
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