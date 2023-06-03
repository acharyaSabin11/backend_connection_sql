const http = require('http');   //includes node js http module
const pg = require('pg');   //adding postgres library
require('dotenv').config();
const fs = require('fs');
const htmlPath = __dirname + '/index.html'
const cssPath = __dirname + '/style.css'
const scriptPath = __dirname + '/script.js'

const htmlContent = fs.readFileSync(htmlPath);
const cssContent = fs.readFileSync(cssPath);
const scriptContent = fs.readFileSync(scriptPath);

const client = new pg.Client(process.env.DB_URL);
client.connect(function (err) {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
  else {

  }
});

const hostname = '0.0.0.0';
const port = process.env.PORT;

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      // Accumulate the incoming data
      body += chunk;
    });



    req.on('end', () => {
      // At this point, the entire body has been received
      const receivedBody = JSON.parse(body);
      client.query(`INSERT INTO tbl_names(name) VALUES(\'${receivedBody.value}')`);
      // Do something with the body data...

      res.statusCode = 200;
      res.end('Body received successfully.');
    });
  }
  else if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': htmlContent.length,
        'Expires': new Date().toUTCString()
      });
      res.write(htmlContent);
    }
    else if (req.url === '/style.css') {
      res.writeHead(200, {
        'Content-Type': 'text/css',
        'Content-Length': cssContent.length,
        'Expires': new Date().toUTCString()
      });
      res.write(cssContent);
    }
    else if (req.url === '/script.js') {
      res.writeHead(200, {
        'Content-Type': 'text/script',
        'Content-Length': scriptContent.length,
        'Expires': new Date().toUTCString()
      });
      res.write(scriptContent);
    }
    res.end();

  }
}); //creates a new http server and returns it

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});