const http = require('http');
const fs = require('fs');
const data = "./beijaflor.png"

const options = {
    hostname: '127.0.0.1',
    port: 3000,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
}

const req = http.request(options, res => {
    const stream = fs.createWriteStream("./beijaflor_salvo.png", {flags:'a'});
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        stream.write(d);
    })

    res.on('end', function () {
        console.log('end');
    })
})

req.on('error', error => {
    console.error(error)
})

req.write(data)
req.end()
