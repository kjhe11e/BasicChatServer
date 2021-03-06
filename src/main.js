'use strict';

const server = require('net').createServer();
let counter = 0;
let sockets = {};

server.on('connection', socket => {
    socket.id = counter++;
    sockets[socket.id] = socket;

    console.log('Client connencted.');
    socket.write('Welcome new client.\n');

    socket.on('data', data => {
        Object.entries(sockets).forEach(([, cs]) => {
            cs.write(`${socket.id}: `);
            cs.write(data);
        });
    });

    socket.on('end', () => {
        delete sockets[socket.id];
        console.log(`Client ${socket.id} disconnected.`);
    });
});

server.on('error', function (err) {
    console.error('Server error:', err);
});

server.on('close', function () {
    console.log('Server closed.');
});

server.listen(8000, () => console.log('Server bound.'));


