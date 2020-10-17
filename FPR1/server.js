const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = '127.0.0.1';
const port = 3000;

const mimeType = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg'
};

const server = http.createServer((req, res) => {
    const chunks = [];
    req.on('begin', () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
    });
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
        const data = Buffer.concat(chunks);
        const filename = data.toString('utf-8');
        fs.readFile(filename, (err, data) => {
            const ext = path.parse(filename).ext;
            res.setHeader('Content-type', mimeType[ext] || 'text/plain');
            res.end(data);
        });
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


