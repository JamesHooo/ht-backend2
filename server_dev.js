
function writeDB(){
	var sys = require('sys');
	  
	var Client = require('mysql').Client;
	var client = new Client();
	  
	client.user = 'admin';
	client.password = '123456';
	  
	console.log('Connecting to MySQL...');
	  
	client.connect(function(error, results) {
	  if(error) {
		console.log('Connection Error: ' + error.message);
		return;
	  }
	  console.log('Connected to MySQL');
	  ClientConnectionReady(client);
	});
	  
	ClientConnectionReady = function(client)
	{
		client.query('USE NodeSample', function(error, results) {
			if(error) {
				console.log('ClientConnectionReady Error: ' + error.message);
				client.end();
				return;
			}
			ClientReady(client);
		});
	};
	  
	ClientReady = function(client)
	{
	  var values = ['Chad', 'Lung', 'Hello World'];
	  client.query('INSERT INTO MyTable SET firstname = ?, lastname = ? , message = ?', values,
		function(error, results) {
		  if(error) {
			console.log("ClientReady Error: " + error.message);
			client.end();
			return;
		  }
		  console.log('Inserted: ' + results.affectedRows + ' row.');
		  console.log('Id inserted: ' + results.insertId);
		}
	  );
	  GetData(client);
	}
	  
	GetData = function(client)
	{
	  client.query(
		'SELECT * FROM MyTable',
		function selectCb(error, results, fields) {
		  if (error) {
			  console.log('GetData Error: ' + error.message);
			  client.end();
			  return;
		  }
		  // Uncomment these if you want lots of feedback
		  //console.log('Results:');
		  //console.log(results);
		  //console.log('Field metadata:');
		  //console.log(fields);
		  //console.log(sys.inspect(results));
	  
		  if(results.length > 0)
		  {
			var firstResult = results[0];
			console.log('First Name: ' + firstResult['firstname']);
			console.log('Last Name: ' + firstResult['lastname']);
			console.log('Message: ' + firstResult['message']);
		  }
	  });
	  
	  client.end();
	  console.log('Connection closed');
	};

}

function read_db() {
	
}

function visitService() {
	var http = require('http');  
      
    var qs = require('querystring');  
      
    var data = {  
        a: 123,  
        time: new Date().getTime()};//这是需要提交的数据  
      
      
    var content = qs.stringify(data);  
      
    var options = {  
        hostname: '127.0.0.1',  
        port: 10086,  
        path: '/pay/pay_callback?' + content,  
        method: 'GET'  
    };  
      
    var req = http.request(options, function (res) {  
        console.log('STATUS: ' + res.statusCode);  
        console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            console.log('BODY: ' + chunk);  
        });  
    });  
      
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
    });  
      
    req.end();  
}


var http = require('http');                                                                                      
                                                                                                                 
function getIPAdress(){                                                                                          
    var interfaces = require('os').networkInterfaces();                                                          
    for(var devName in interfaces){                                                                              
          var iface = interfaces[devName];                                                                       
          for(var i=0;i<iface.length;i++){                                                                       
               var alias = iface[i];                                                                             
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){                  
                     return alias.address;                                                                       
               }                                                                                                 
          }                                                                                                      
    }                                                                                                            
} 

var handleRequest = function(request, response) {
	
	response.writeHead(200);                                                                                       
	response.end("<p>service path</p><br/>"+service);  
} 
 
var service="";
var ip = getIPAdress();
var options = process.argv;
for(var i=0;i<options.length;i++)
{
  if(options[i].indexOf("-search")==0)
  {
	console.log('search');
	service="search-"+ip;
  }
  else if(options[i].indexOf("-addcart")==0) {
	console.log('addcart');
	service="addcart-"+ip;
  }
} 
var www = http.createServer(handleRequest);                                                                
www.listen(80); 