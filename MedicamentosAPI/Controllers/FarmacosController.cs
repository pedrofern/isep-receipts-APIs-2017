using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedicamentosAPI.Models;
using MedicamentosAPI.DTOs;

namespace MedicamentosAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/Farmaco")]
    public class FarmacosController : Controller
    {
        private readonly MedicamentosAPIContext _context;

        public FarmacosController(MedicamentosAPIContext context)
        {
            _context = context;
        }

        // GET: api/Farmaco
        [HttpGet]
        public IEnumerable<FarmacoDTO> GetFarmaco()
        {
            return _context.Farmaco.Select(m => new FarmacoDTO(m));
        }

        // GET: api/Farmacos/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetFarmaco([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var farmaco = await _context.Farmaco.SingleOrDefaultAsync(m => m.FarmacoId == id);

            if (farmaco == null)
            {
                return NotFound();
            }

            FarmacoDTO dto=new FarmacoDTO(farmaco);


            return Ok(dto);
        }

        // GET: api/Farmaco/5/Apresentacoes
        [HttpGet("{id}/Apresentacoes")]
        public async Task<IActionResult> GetApresentacoesDoFarmaco([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var farmaco = await _context.Farmaco.SingleOrDefaultAsync(m => m.FarmacoId == id);

            if (farmaco == null)
            {
                return NotFound();
            }

            var apresentacoes = _context.Apresentacao.Select(a => new ApresentacaoDTO(a)).Where(a => id == farmaco.FarmacoId);

            if (apresentacoes == null)
            {
                return NotFound();
            }

            return Ok(apresentacoes);
        }

        // GET: api/Farmaco/5/Medicamentos
        [HttpGet("{id}/Medicamentos")]
        public async Task<IActionResult> GetMedicamentosDoFarmaco([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var farmaco = await _context.Farmaco.SingleOrDefaultAsync(m => m.FarmacoId == id);

            if (farmaco == null)
            {
                return NotFound();
            }

            var medicamentos = _context.Medicamento.Select(m => new MedicamentoDTO(m)).Where(m => id == farmaco.FarmacoId);

            if (medicamentos == null)
            {
                return NotFound();
            }

            return Ok(medicamentos);
        }

        // GET: api/Farmaco/5/Posologias
        [HttpGet("{id}/Posologias")]
        public async Task<IActionResult> GetPosologiasDoFarmaco([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var farmaco = await _context.Farmaco.SingleOrDefaultAsync(m => m.FarmacoId == id);

            if (farmaco == null)
            {
                return NotFound();
            }

            var posologias = _context.Posologia.Select(m => new PosologiaDTO(m)).Where(m => id == farmaco.FarmacoId);

            if (posologias == null)
            {
                return NotFound();
            }

            return Ok(posologias);
        }

        // GET: api/Farmacos/nome="{nome}"
        [HttpGet("nome=\"{nome}\"")]
        public async Task<IActionResult> GetFarmaco([FromRoute] string nome)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var farmaco = await _context.Farmaco.SingleOrDefaultAsync(m => m.principio_ativo== nome);

            if (farmaco == null)
            {
                return NotFound();
            }

            FarmacoDTO dto=new FarmacoDTO(farmaco);


            return Ok(dto);
        }


        // PUT: api/Farmacos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFarmaco([FromRoute] int id, [FromBody] Farmaco farmaco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != farmaco.FarmacoId)
            {
                return BadRequest();
            }

            _context.Entry(farmaco).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FarmacoExists(id))
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

        // POST: api/Farmacos
        [HttpPost]
        public async Task<IActionResult> PostFarmaco([FromBody] Farmaco farmaco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Farmaco.Add(farmaco);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFarmaco", new { id = farmaco.FarmacoId }, farmaco);
        }

        // DELETE: api/Farmacos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFarmaco([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var farmaco = await _context.Farmaco.SingleOrDefaultAsync(m => m.FarmacoId == id);
            if (farmaco == null)
            {
                return NotFound();
            }

            _context.Farmaco.Remove(farmaco);
            await _context.SaveChangesAsync();

            return Ok(farmaco);
        }

        private bool FarmacoExists(int id)
        {
            return _context.Farmaco.Any(e => e.FarmacoId == id);
        }
    }
}