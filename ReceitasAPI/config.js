module.exports = {

    'secret': 'nana',
    'database': 'mongodb://admin:admin@ds149865.mlab.com:49865/arqsi2017',

    //'database': 'mongodb://admin:admin@ds231315.mlab.com:31315/1151088e1060503',
    'urlMedicamentosToken': 'http://medicamentosapi2017.azurewebsites.net/api/Account/Token',
    'urlApresentacoesPorId': 'http://medicamentosapi2017.azurewebsites.net/api/Apresentacao/', 
    'urlComentario': 'http://medicamentosapi2017.azurewebsites.net/api/Comentario/', // para ler comentario de uma apresentacao .../Apresentacao/{id}/Comentario
    'loginMedicamentos': '{email:"a@a.pt", password:"Qwerty1!"}',
    'mailUser': 'arqsi3da',
    'mailPass': 'arqsi2017',
    'num_dias_alerta': '3'
};