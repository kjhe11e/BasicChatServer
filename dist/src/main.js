'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var server = require('net').createServer();
var counter = 0;
var sockets = {};

server.on('connection', function (socket) {
    socket.id = counter++;
    sockets[socket.id] = socket;

    console.log('Client connencted.');
    socket.write('Welcome new client.\n');

    socket.on('data', function (data) {
        Object.entries(sockets).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                cs = _ref2[1];

            cs.write(socket.id + ': ');
            cs.write(data);
        });
    });

    socket.on('end', function () {
        delete sockets[socket.id];
        console.log('Client ' + socket.id + ' disconnected.');
    });
});

server.on('error', function (err) {
    console.error('Server error:', err);
});

server.on('close', function () {
    console.log('Server closed.');
});

server.listen(8000, function () {
    return console.log('Server bound.');
});