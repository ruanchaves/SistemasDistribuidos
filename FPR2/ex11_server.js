const net = require('net');
const port = 8080;
const server = net.createServer(function(connection) { 
   
   connection.on('data', function(word){
       let reverse_word = word.toString().split("").reverse().join("")
       connection.write(reverse_word)
   })

   connection.pipe(connection);

});

server.listen(port, function() { 
   console.log('Online.');
});