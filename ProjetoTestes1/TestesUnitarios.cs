using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
//using MedicamentosAPI.Models;

namespace ProjetoTestes
{
    [TestClass]
    public class TestesUnitarios
    {
        [TestMethod]
        public void TestarGETMedicamento()
        {
            /*
            var controller = new MedicamentosController(new MedicamentosAPIContext());

            var item =CriarMedicamentoDTO();

            var result = controller.PostMedicamento(item) as CreatedAtRouteNegotiatedContentResult<Medicamento>;

            Assert.IsNotNull(result);
            Assert.AreEqual(result.RouteName, "MedicamentosApi");
            Assert.AreEqual(result.RouteValues["id"], result.Content.Id);
            Assert.AreEqual(result.Content.Nome, item.Nome);
            */
        }


        [TestMethod]
        public void testarGETIdcomMedicamentoCorretoDevolvido()
        {
            /*
            var context = new APIMedicamentosContext();
            context.Medicamentos.Add(CriarMedicamentoDTO);

            var controller = new MedicamentosController(context);
            var result = controller.GetMedicamento(3) as OkNegotiatedContentResult<Medicamento>;

            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Content.Id);
            */
        }

        [TestMethod]
        public void testarGETListaMedicamentos()
        {
            /*
            var context = new APIMedicamentosContext();
            CriarListaMedicamentos(context);

            var controller = new MedicamentosController(context);
            var result = controller.GetMedicamentos() as TestMedicamentosDBSet;

            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Local.Count);
            */
        }

        [TestMethod]
        public void TestarPUTMedicamento()
        {
            /*
            var controller = new MedicamentosController(new MedicamentosAPIContext());

            var item =ObterMedicamentoDTO();

            var result = controller.PutMedicamento(item.id, item) as StatusCodeResult;

            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(StatusCodeResult));
            Assert.AreEqual(HttpStatusCode.NoContent, result.StatusCode);
            */
        }

        [TestMethod]
        public void TestarPUTQuandoIDNaoExiste()
        {
            /*
            var controller = new MedicamentoController(new MedicamentoAPIContext());

            var badresult = controller.PutProduct(999, ObterMedicamentoId());
            Assert.IsInstanceOfType(badresult, typeof(BadRequestResult));
        */
         }

        [TestMethod]
        public void TestarDELETEQuandoExiste()
        {
            /*
            var context=new MedicamentoAPIContext();
            var item=CriarMedicamento();
            context.Medicamentos.add(item);

            var controller = new MedicamentoController(context);

            var result = controller.DeleteMedicamento(3) as OkNegotiatedContentResult<Medicamento>;

            Assert.IsNotNull(result);
            Assert.AreEqual(item.Id, result.Content.Id);

             */
        }

        /*  
        Medicamento CriarMedicamentoDTO()
        {
            return new Medicamento { Id = 3, Nome = "Test name" };
        }

        Void CriarListaMedicamentos(Context var)
        {
            context.Medicamentos.Add( new Medicamento{ Id = 3, Nome = "Demo name"};
            context.Medicamentos.Add( new Medicamento{ Id = 2, Nome = "Testeame"};
      
        }
        */


    }
}
