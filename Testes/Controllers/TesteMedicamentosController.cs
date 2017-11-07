using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Authorization;
using ProjetoTestes.DBTestClasses;
using MedicamentosAPI.DTOs;
using MedicamentosAPI.Models;

namespace MedicamentosAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/Medicamento")]
    public class TesteMedicamentosController : Controller
    {
        private readonly TesteMedicamentosAPIContext _context;

        public TesteMedicamentosController()
        {
            var optionsBuilder = new DbContextOptionsBuilder<TesteMedicamentosAPIContext>();
            optionsBuilder.UseSqlite("Data Source=medicamento.db");

            _context = new TesteMedicamentosAPIContext(optionsBuilder.Options);
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

        // DELETE: api/Medicamentos/{id}
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