const net = require('net');
const port = 8080;
const client = new net.Socket();

const format_res = function(res){
    let index = Math.floor(res.length / 2);
    console.log(res.slice(0, index));
}

client.connect(port, '127.0.0.1', function() {
    client.write('amor');
});

client.on('data', function(data) {
    let res = data.toString();
    format_res(res);
});

client.on('close', function() {
	console.log('Connection closed.');
});