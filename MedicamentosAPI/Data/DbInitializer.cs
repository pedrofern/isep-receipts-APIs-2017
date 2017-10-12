using MedicamentosAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicamentosAPI.Data
{
    public class DbInitializer
    {

        public static void Initialize(MedicamentosAPIContext context)
        {
            context.Database.EnsureCreated();

            // Procura por medicamentos
            if (!context.Medicamento.Any())
            {
                var medicamentos = new Medicamento[]
                {
                    new Medicamento {MedicamentoId=1, nome="Aspirina Prevent", laboratorio="Bayer" },
                    new Medicamento {MedicamentoId=2, nome="Aspirina Protect", laboratorio="Sanofi-Synthelabo" },
                    new Medicamento {MedicamentoId=3, nome="Aspirina C", laboratorio="Sanofi-Synthelabo" },
                    new Medicamento {MedicamentoId=4, nome="Cafiaspirina", laboratorio="Sanofi-Synthelabo" },
                    new Medicamento {MedicamentoId=5, nome="Ben-u-ron", laboratorio="Bene"},
                    new Medicamento {MedicamentoId=6, nome="Brufen", laboratorio="Abbott"},
                    new Medicamento {MedicamentoId=7, nome="Alivium", laboratorio="Anvisa"},
                    new Medicamento {MedicamentoId=8, nome="Alivium", laboratorio="Brainfarma"},
                    new Medicamento {MedicamentoId=9, nome="Gripen F", laboratorio="EMS"},
                    new Medicamento {MedicamentoId=10, nome="Ben-u-ron", laboratorio="Bene"},

                };

                foreach (Medicamento m in medicamentos)
                {

                    context.Medicamento.Add(m);

                }
                context.SaveChanges();
            }


            // Procura por farmacos
            
            if (!context.Farmaco.Any())
            {

                var farmacos = new Farmaco[]
                {
                   new Farmaco { FarmacoId=1, principio_ativo = "Acido acetil-salicilico" },
                   new Farmaco { FarmacoId=2, principio_ativo = "Ipobrufeno"},
                   new Farmaco { FarmacoId=3, principio_ativo = "Paracetamol"},
                   new Farmaco {  FarmacoId=4, principio_ativo = "Parametasona"},
   
                };
                foreach (Farmaco f in farmacos)
                {
                    context.Farmaco.Add(f);
                }
                context.SaveChanges();
            }


            // Procura por posologias

            if (!context.Posologia.Any())
            {

                var posologias = new Posologia[]
                {
                   new Posologia {PosologiaId=1, dose=100, intervalo_tempo_horas=8, periodo_tempo_dias=3,
                   via_administracao="via oral"},
                   new Posologia {PosologiaId=2, dose=400, intervalo_tempo_horas=6, periodo_tempo_dias=5,
                   via_administracao="via oral"},
                   new Posologia {PosologiaId=3, dose= 40, intervalo_tempo_horas=8, periodo_tempo_dias=8,
                   via_administracao="via oral"},
                   new Posologia {PosologiaId=4, dose= 100, intervalo_tempo_horas=24, periodo_tempo_dias=3,
                   via_administracao="via injeccao"},
                   new Posologia {PosologiaId=5, dose= 10, intervalo_tempo_horas=6, periodo_tempo_dias=7,
                   via_administracao= "via retal"},
      
                    };
                    foreach (Posologia p in posologias)
                    {
                        context.Posologia.Add(p);
                    }
                    context.SaveChanges();
                }


            //Procura por apresentacoes
            if (!context.Apresentacao.Any())
            {

                var apresentacoes = new Apresentacao[]
                {
                    new Apresentacao{ ApresentacaoId=1, forma_adm="Xarope", dosagem=25, quantidade=1,
                                        FarmacoId=2, MedicamentoId=6, Posologia_GenericaId=2},

                    new Apresentacao{ ApresentacaoId=2, forma_adm="Comprimido", dosagem=10, quantidade=10,
                                    FarmacoId=3, MedicamentoId=5, Posologia_GenericaId=2},

                    new Apresentacao{ ApresentacaoId=3, forma_adm="Supositorio", dosagem=10, quantidade=2,
                                    FarmacoId=3, MedicamentoId=5, Posologia_GenericaId=5},

                    new Apresentacao{ ApresentacaoId=4, forma_adm="Comprimido", dosagem=25, quantidade=10,
                                    FarmacoId=1, MedicamentoId=1, Posologia_GenericaId=2},

                    new Apresentacao{ ApresentacaoId=5, forma_adm="Comprimido", dosagem=25, quantidade=8,
                                    FarmacoId=3, MedicamentoId=2, Posologia_GenericaId=1},

                    new Apresentacao{ ApresentacaoId=6, forma_adm="Comprimido", dosagem=25, quantidade=8,
                                    FarmacoId=3, MedicamentoId=3, Posologia_GenericaId=3},

                    new Apresentacao{ ApresentacaoId=7, forma_adm="Liquido", dosagem=50, quantidade=3,
                                    FarmacoId=2, MedicamentoId=8, Posologia_GenericaId=4},

                    new Apresentacao{ ApresentacaoId=8, forma_adm="Comprimido", dosagem=25, quantidade=8,
                                    FarmacoId=2, MedicamentoId=6, Posologia_GenericaId=3},



                };
                foreach (Apresentacao a in apresentacoes)
                {
                    context.Apresentacao.Add(a);
                }

                context.SaveChanges();
            }
        }
    }
}