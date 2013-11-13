/*
 * Basic HTTP Client to send data to the Cloud Server
 *
 */

var http = require('http');

var requestQueue = [];

function send (json){
	var options = {
  		hostname: '127.0.0.1',
  		port: 4000,
  		path: '/collector/collect/',
  		method: 'POST',
	};
 
	var req = http.request(options, function(res) {
	  console.log('\nSTATUS: ' + res.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
	    console.log('BODY: ' + chunk);
	  });
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	  requestQueue.push(json);
	  console.log('request queued, will retry later.');
	});
	req.setHeader('content-type', 'application/json');
	// write data to request body
	req.write(JSON.stringify(json));

	req.end();
 }

exports.send = send;
// Boucle de renvoi des données en cas d'erreur
setInterval(function(){
	var fixedQueue = requestQueue;
	requestQueue = [];
	var requestData;
	while(requestData = fixedQueue.shift()){
		console.log('\n\nTrying to resend a previously failed request');
		console.log('---------------------------------------------\n')
		console.dir(requestData);
		send(requestData);
	}
	
},
15000
 	)
