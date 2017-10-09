﻿using System;
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
    [Route("api/Medicamentos")]
    public class MedicamentosController : Controller
    {
        private readonly MedicamentosAPIContext _context;

        // Typed lambda expression for Select() method.
        private static readonly Expression<Func<Medicamento, MedicamentoDTO>> AsMedicamentoDTO =
            x => new MedicamentoDTO
            {
                MedicamentoId = x.MedicamentoId,
                nome = x.nome,
                laboratorio = x.laboratorio,
                validade= x.validade,
                tamanho = x.tamanho,
            };

        public MedicamentosController(MedicamentosAPIContext context)
        {
            _context = context;
        }

        // GET: api/Medicamentos
        [HttpGet]
        public IEnumerable<Medicamento> GetMedicamento()
        {
            return _context.Medicamento;
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

            return Ok(medicamento);
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