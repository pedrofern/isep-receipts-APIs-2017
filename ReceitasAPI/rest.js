var http = require("http");

var options = {
    "method": "GET",
    "hostname": "localhost",
    "port": 50647,
    "path": "/api/Medicamento",
    "headers":{
       "Content-Type":"application/json",
       "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZGIxZjllYS01ZjBiLTQxYmEtOTA5Ni05ZTgwN2EyOWVkNTYiLCJzdWIiOiJhQGEucHQiLCJleHAiOjE1MTYwNTE2ODksImlzcyI6Imh0dHA6Ly9zZW1lbnRld2ViYXBpLmxvY2FsIiwiYXVkIjoiaHR0cDovL3NlbWVudGV3ZWJhcGkubG9jYWwifQ.1uhQa1YOPREK5ntuUsLWYk7ncr9gIAvTjWQu0M8IluM"
    }
};

var req= http.request(options, function(res) {
    var chunks=[];

    res.on("data", function(chunk){
        chunks.push(chunk);
    });

    res.on("end", function(){
        var body=Buffer.concat(chunks);
        console.log(body.toString());
    });
});

req.end();