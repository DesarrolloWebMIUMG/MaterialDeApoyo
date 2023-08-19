var rpc = require('json-rpc2');
 
var server = rpc.Server.$create({
    'websocket': true, 
    'headers': { 
        'Access-Control-Allow-Origin': '*'
    }
});
 
function ReinicioServicio(args, opt, callback) {
  for(let i=0;i<args.length;i++){
    console.log("Realizando el reinicio de servicio "+args[i]); 
  }
  callback(null, args);
}
 
server.expose('ReinicioServicio', ReinicioServicio);
 

server.listen(8000, 'localhost');