//--------- GET TEST ----- //

tests["Codigo com estado 200"]=responseCode.code===202;

var obj='{"id":1,"nome":"Aspirina Prevent"}';    //presente na base de dados
var obj2='{"id":2, "nome":"Aspirina Prevent"}';  //nao presente na base de dados

tests{"Listas Medicamentos (json contem medicamento com id)"]=responseBody.has(obj);
tests{"Listas Medicamentos (nao contem medicamento com id)"]=!responseBody.has(obj2);

//---
tests["Codigo com estado 200"]=responseCode.code===202;

var obj='{"id":1,"forma_adm":"Xarope", "concentracao":"25mg", "qtd":"1ml"}'; //presente na base de dados
var obj2='{"id":2,"forma_adm":"Cucu"}'; //nao presente na base de dados

tests["Lista Apresentacoes (contem)"]=responseBody.has(obj);
tests["Lista Apresentacoes (nao contem)"]=responseBody.has(obj2);

tests["Codigo para falhar"]=responseCode.code===400 ||| responseCode.code===404;

//---------- POST TEST ---- //
/* 1a fase
var obj= '{"nome":"TESTE"}';
var jsonObj= JSON.parse(obj);

tests["Lista Medicamentos ainda nao contem medicamento"]= !responseBody.has(obj);
*/
tests["POST com sucesso"]=responseCode.code===201 || responseCode.code===202;
tests["Lista Medicamentos ja contem medicamento"]= responseBody.has(obj);


//nao deixa inserir Apresentacao sem campos validos
//["forma_adm":"Xarope","concentracao":"25","qtd":"1"} no body
tests["PUT sem sucesso"]= responseCode.code!==201 && responseCode.code!==202
&& responseCode.code!==204;

tests["PUT nao valido"]= responseCode.code==400;


//--------- PUT TEST ----- //

tests["PUT com sucesso"]= responseCode.code===201 || responseCode.code===202
|| responseCode.code===204;

var obj='{"id":1, "principio_ativo":"Acido acetil-salicilico"}';
var jsonObj= JSON.parse(obj);
tests["Posologia DELETE - antigo nao encontrado"]=responseBody.has(obj);

var obj2={"id":1, "principio_ativo":"TESTE Acido-salicilico"}';
var jsonObj=JSON.parse(obj2);

tests["Farmaco PUT - objeto modificado encontrado"]=responseBody.has(obj2);


//--------- DELETE TEST ----//
/*1ªfase
var obj:'{"id":2, "dose": 400, "via_administracao":"via oral", "intervalo_tempo_horas":6,
"periodo_tempo_dias":5}';
var jsonObj=JSON.parse(obj);
tests["Posologia DELETE - objeto existente em pre-delete"]= responseBody.has(obj);
*/

tests["DELETE com sucesso"]=responseCode.code===200;
tests["Posologia DELETE - objeto nao existente pos-delete"]=!responseBody.has(obj);

//verificacao se apagou apresentacoes adjacentes a posologia eliminada
var obj2:'{"id=1}';;
var jsonObj=JSON.parse(obj2);
tests["Posologia DELETE - objeto conetado nao existente"]= !responseBody.has(obj);
//----------------------------//
