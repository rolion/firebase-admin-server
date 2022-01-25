const app = require("./app");
const { config } = require('./config');
const port = config.port;

app.listen(port, () => {
    console.log(`server running in port:${port}`);
});
