const http = require('http');   //includes node js http module
const pg = require('pg');   //adding postgres library
require('dotenv').config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USERNAME;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;
const connectionString = `postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;

console.log(connectionString);

const client = new pg.Client(connectionString);
client.connect(function (err) {
  console.log(err);
  if (err) {
    return console.error('could not connect to postgres', err);
  }
});

const hostname = '127.0.0.1';
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
      console.log(receivedBody.name);

      // Do something with the body data...

      res.statusCode = 200;
      res.end('Body received successfully.');
    });
  }
  // else if (req.method === 'GET') {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/html',
  //     'Content-Length': html.length,
  //     'Expires': new Date().toUTCString()
  //   });
  //   res.end(html);
  // }
}); //creates a new http server and returns it

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});