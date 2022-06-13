var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http.createServer((request, response) => {
    fs.readFile(`${__dirname}/images/${request.url}`, (err, data) => {
        if (err) {
            response.writeHead(404, { "Content-Type": "text/plain" })
            response.end(`404 Not Found`)
        } else {
            response.writeHead(200, { "Content-Type": "image/jpg" })
            response.end(data)
        }
    })
}).listen(3000, '127.0.0.1')