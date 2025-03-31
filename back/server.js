require('dotenv').config();
const http = require("http");
const app = require("./app");
const socketConfig = require('./functions/socket');

const server = http.createServer(app);

socketConfig(server);

server.on("listening", () => {
    console.log(`Server is listening on ${server.address().address}:${server.address().port}`);
});

const port = sanitizePort(process.env.PORT || 2000);
function sanitizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(val)) return val;
    if (val >= 0) return port;
    return false;
}

app.set("port", port);

server.on("error", (err) => {
    if (err.syscall !== "listen") {
        throw err;
    }
 
    switch (err.code) {
        case 'EACCES':
            console.log("Port requires elevated privileges");
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.log("Port already in use");
            process.exit(1);
            break;

        default: throw err;
    }
});

server.listen(port);