//create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = require('./comments');
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};

//create server
http.createServer(function (req, res) {
    var uri = url.parse(req.url).pathname;
    var fileName = path.join(process.cwd(), unescape(uri));
    console.log('Loading ' + uri);
    var stats;

    try {
        stats = fs.lstatSync(fileName);
    } catch (e) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 Not Found\n');
        res.end();
        return;
    }

    if (stats.isFile()) {
        var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
        res.writeHead(200, {'Content-Type': mimeType});

        var fileStream = fs.createReadStream(fileName);
        fileStream.pipe(res);
    } else if (stats.isDirectory()) {
        res.writeHead(302, {
            'Location': 'index.html'
        });
        res.end();
    } else {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.write('500 Internal server error\n');
        res.end();
    }
}).listen(1337);

//create web socket
var io = require('socket.io').listen(8000);
io.sockets.on('connection', function (socket) {
    //listen for new comment
    socket.on('newComment', function (data) {
        comments.addComment(data);
        io.sockets.emit('commentsChanged', comments.getComments());
    });

    //listen for delete comment
    socket.on('deleteComment', function (data) {
        comments.deleteComment(data);
        io.sockets.emit('commentsChanged', comments.getComments());
    });

    //listen for change comment
    socket.on('changeComment', function (data) {
        comments.changeComment(data);
        io.sockets.emit('commentsChanged', comments.getComments());
    });

    //send comments to client
    socket.emit('commentsChanged', comments.getComments());
});