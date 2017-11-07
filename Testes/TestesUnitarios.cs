using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProjetoTestes.DBTestClasses;
using MedicamentosAPI.Models;
using MedicamentosAPI.Controllers;
using System.Web.Http.Results;
using MedicamentosAPI.DTOs;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Microsoft.EntityFrameworkCore;

namespace ProjetoTestes
{
    [TestClass]
    public class TestesUnitarios
    {
         
        [TestMethod]
        public async System.Threading.Tasks.Task TestarGETMedicamentoAsync()
        {
            var controller = new TesteMedicamentosController();
            var item = CriarMedicamentoDTO();
            var result = await controller.PostMedicamento(item) as CreatedAtRouteNegotiatedContentResult<Medicamento>;

            Assert.IsNotNull(result);
            Assert.AreEqual(result.RouteName, "MedicamentosApi");
            Assert.AreEqual(result.RouteValues["id"], result.Content.MedicamentoId);
            Assert.AreEqual(result.Content.nome, item.nome);
        }

        [TestMethod]
        public async System.Threading.Tasks.Task TestarGETIdcomMedicamentoCorretoDevolvidoAsync()
        {
            var controller = new TesteMedicamentosController();
            var item = CriarMedicamentoDTO();
            var result = await controller.PostMedicamento(item) as CreatedAtRouteNegotiatedContentResult<Medicamento>;

            var result2= await controller.GetMedicamento(3) as OkNegotiatedContentResult<Medicamento>;

            Assert.IsNotNull(result2);
            Assert.AreEqual(3, result2.Content.MedicamentoId);
  
        }

        [TestMethod]
        public void TestarGETListaMedicamentos()
        {

            var optionsBuilder = new DbContextOptionsBuilder<TesteMedicamentosAPIContext>();
            optionsBuilder.UseSqlite("Data Source=medicamento.db");

            var context = new TesteMedicamentosAPIContext(optionsBuilder.Options);
            CriarListaMedicamentos(context);

            var controller = new TesteMedicamentosController();
           IEnumerable<MedicamentoDTO> result = controller.GetMedicamento();
  
            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Count());
            
        }

        [TestMethod]
        public async System.Threading.Tasks.Task TestarPUTMedicamentoAsync()
        {
            
            var controller = new TesteMedicamentosController();

            var item = CriarMedicamentoDTO();

            var result = await controller.PutMedicamento(item.MedicamentoId, item) as StatusCodeResult;

            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(StatusCodeResult));
            Assert.AreEqual(HttpStatusCode.NoContent, result.StatusCode);
            
        }

        [TestMethod]
        public void TestarPUTQuandoIDNaoExiste()
        {
            
            var controller = new TesteMedicamentosController();

            var badresult = controller.PutMedicamento(999, CriarMedicamentoDTO());
            Assert.IsInstanceOfType(badresult, typeof(BadRequestResult));
        
         }

        [TestMethod]
        public async System.Threading.Tasks.Task TestarDELETEQuandoExisteAsync()
        {

            var controller = new TesteMedicamentosController();

            var item=CriarMedicamentoDTO();
            await controller.PostMedicamento(item);
                 
            var result = await controller.DeleteMedicamento(3) as OkNegotiatedContentResult<Medicamento>;

            Assert.IsNotNull(result);
            Assert.AreEqual(item.MedicamentoId, result.Content.MedicamentoId);

             
        }

        Medicamento CriarMedicamentoDTO()
        {
            return new Medicamento { MedicamentoId = 3, nome = "Test name" };
        }

        void CriarListaMedicamentos(TesteMedicamentosAPIContext context)
        {
            context.Medicamento.Add( new Medicamento{ MedicamentoId = 3, nome = "Demo name"});
            context.Medicamento.Add( new Medicamento{ MedicamentoId = 2, nome = "Testeame"});  
        }

    }
}
