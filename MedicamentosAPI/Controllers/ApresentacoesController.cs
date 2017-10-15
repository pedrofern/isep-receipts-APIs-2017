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
    [Route("api/Apresentacao")]
    public class ApresentacoesController : Controller
    {
        private readonly MedicamentosAPIContext _context;

        public ApresentacoesController(MedicamentosAPIContext context)
        {
            _context = context;
        }

        // GET: api/Apresentacoes
        [HttpGet]
        public IEnumerable<ApresentacaoDTO> GetApresentacao()
        {
            return _context.Apresentacao.Select(m => new ApresentacaoDTO(m));
        }

        // GET: api/Apresentacoes/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetApresentacao([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var apresentacao = await _context.Apresentacao.SingleOrDefaultAsync(m => m.ApresentacaoId == id);

            if (apresentacao == null)
            {
                return NotFound();
            }

            ApresentacaoDTO dto = new ApresentacaoDTO(apresentacao);

            return Ok(dto);
        }

        // GET: api/Medicamento/{id}/Apresentacoes
        [Route("~/api/Medicamento/{id}/Apresentacoes")]
        public IActionResult GetApresentacaosMedicamentos([FromRoute]int Id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IQueryable<Apresentacao> apresentacoes = _context.Apresentacao.Where(m => m.Medicamento.MedicamentoId == Id);
            List<ApresentacaoDTO> lista_apresentacoes = new List<ApresentacaoDTO>();

            foreach (Apresentacao a in apresentacoes.ToList())
            {
                lista_apresentacoes.Add(new ApresentacaoDTO(a));
            }

            if (lista_apresentacoes == null)
            {
                return NotFound();
            }

            return Ok(lista_apresentacoes);

        }

        // PUT: api/Apresentacoes/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApresentacao([FromRoute] int id, [FromBody] Apresentacao apresentacao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != apresentacao.ApresentacaoId)
            {
                return BadRequest();
            }

            _context.Entry(apresentacao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApresentacaoExists(id))
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

        // POST: api/Apresentacoes
        [HttpPost]
        public async Task<IActionResult> PostApresentacao([FromBody] Apresentacao apresentacao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Apresentacao.Add(apresentacao);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetApresentacao", new { id = apresentacao.ApresentacaoId }, apresentacao);
        }

        // DELETE: api/Apresentacoes/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApresentacao([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var apresentacao = await _context.Apresentacao.SingleOrDefaultAsync(m => m.ApresentacaoId == id);
            if (apresentacao == null)
            {
                return NotFound();
            }

            _context.Apresentacao.Remove(apresentacao);
            await _context.SaveChangesAsync();

            return Ok(apresentacao);
        }

        private bool ApresentacaoExists(int id)
        {
            return _context.Apresentacao.Any(e => e.ApresentacaoId == id);
        }
    }
}