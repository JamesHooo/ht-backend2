                                                                                     
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

function search() {
	var mysql = require('mysql');
	var conn = mysql.createConnection({
		host: '10.166.224.233',
		user: 'rw',
		password: '123456',
		database:'product',
		port: 3306
		}
	);
	conn.connect();
		
	var selectSQL = 'select sum(pcount) as count from product';
	var count = 0;
	conn.query(selectSQL, function (err, rows) {
	if (err) console.log(err);
	count = rows[0].count;
	});
	conn.end();
	return count;
}

var handleRequest = function(request, response) {
	var ip = getIPAdress();
	response.writeHead(200);
	var mysql = require('mysql');
	var conn = mysql.createConnection({
		host: '10.166.224.233',
		user: 'rw',
		password: '123456',
		database:'product',
		port: 3306
		}
	);
	 conn.connect();                                                                                          
	var data='';                                                                                             
	var selectSQL = 'select sum(pcount) as count from product';                                              
	conn.query(selectSQL, function (err, rows) {                                                             
		if (err) console.log(err);                                                                       
		data = "<p>total "+rows[0].count+" milk sold <br/>"+ip;                                          
		console.log(rows[0].count);                                                                      
		response.write(data);                                                                            
		response.end();                                                                                  
	});                                                                                                      
	console.log("data is",data);                                                                             
	conn.end();  
} 



var www = http.createServer(handleRequest);                                                                
www.listen(8080); 