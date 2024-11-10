const http = require('http');
const fs = require('fs');
const path = require('path');
const socketIo = require('socket.io');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/style.css') {
        fs.readFile(path.join(__dirname, 'style.css'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading style.css');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    }
});

const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });
});

const PORT = 5001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});