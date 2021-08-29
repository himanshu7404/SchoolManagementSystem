import http from 'http';
import app from './app.js';

const port = 9000;
const server = http.createServer(app);

server.listen(port);