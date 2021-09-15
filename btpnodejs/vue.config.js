// see http://vuejs-templates.github.io/webpack for documentation.
var env = process.env.NODE_ENV;
var bdisaBleHostCheck = false;
let evnPort = process.env.PORT;

if (env === "dev") {
    evnPort = 3000;
    bdisaBleHostCheck = false
} else {
    bdisaBleHostCheck = true;
}

module.exports = {
    devServer: {
        port: evnPort,
        disableHostCheck: bdisaBleHostCheck
    }
}