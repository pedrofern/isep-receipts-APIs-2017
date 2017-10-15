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

        // GET: api/Farmacos/{id}
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


        // GET: api/Farmaco/{id}/Medicamentos
        [Route("~/api/Farmaco/{id}/Medicamentos")]
        public async Task<IActionResult> GetMedicamentosFarmacos([FromRoute]int Id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            List<Apresentacao> apresentacoes_med_farm = await _context.Apresentacao.Include(a => a.Medicamento).Where(b => b.FarmacoId == Id).ToListAsync();
            HashSet<int> lista_medicamentos = new HashSet<int>();

            foreach (Apresentacao a in apresentacoes_med_farm.ToList())
            {
              
                    lista_medicamentos.Add(a.MedicamentoId);
            }

            if (lista_medicamentos == null)
            {
                return NotFound();
            }

            return Ok(lista_medicamentos);

        }

        // GET: api/Farmaco/{id}/Posologias
        [Route("~/api/Farmaco/{id}/Posologias")]
        public async Task<IActionResult> GetPosologiasFarmaco([FromRoute]int Id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<Apresentacao> apresentacoes_farm_pos = await _context.Apresentacao.Include(a => a.Posologia_Generica).Where(b => b.FarmacoId == Id).ToListAsync();
            HashSet<PosologiaIdDTO> lista_posologias = new HashSet<PosologiaIdDTO>();

            foreach (Apresentacao a in apresentacoes_farm_pos.ToList())
            {

                lista_posologias.Add(new PosologiaIdDTO(a.Posologia_GenericaId));
            }

            if (lista_posologias == null)
            {
                return NotFound();
            }

            return Ok(lista_posologias);

        }

        // GET: api/Farmaco/{id}/Apresentacoes
        [Route("~/api/Farmaco/{id}/Apresentacoes")]
        public async Task<IActionResult> GetApresentacoesFarmaco([FromRoute]int Id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<Apresentacao> apres_farm = await _context.Apresentacao.Where(a => a.FarmacoId == Id).ToListAsync();
            HashSet<ApresentacaoDTO> lista_apresentacoes = new HashSet<ApresentacaoDTO>();

            foreach (Apresentacao a in apres_farm.ToList())
            {

                lista_apresentacoes.Add(new ApresentacaoDTO(a));
            }

            if (lista_apresentacoes == null)
            {
                return NotFound();
            }

            return Ok(lista_apresentacoes);

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