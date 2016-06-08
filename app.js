var http = require('http');
var url = require('url');

var handlers = {};

http.createServer((req, res) => {
        var pathname = url.parse(req.url, true).pathname;
        res.setHeader('Content-type', 'text/html');

        if(handlers[pathname] !== undefined) {
            handlers[pathname](req, res);
        } else {
            res.statusCode = 404;
            res.end(`Page <i>${req.url.substr(1)}</i> not found!!!`);
        }
    })
    .listen(3000);


handlers['/'] = (req, res) => res.end('<b>Welcome</b> to Home page!!!');
handlers['/user'] = (req, res) => res.end(`Hello, dear <b>${url.parse(req.url, true).query.name}</b>`);
handlers['/example'] = (req, result) => {
    http.get({
        host: 'man.ru',
        path: '/'
    }, (res) => {
        var str = '';

        res.on('data', function (chunk) {
            str += chunk;
        });

        res.on('end', function () {
            result.end(str);
        });
    });
};
