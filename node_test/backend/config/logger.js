const APP_LOGGER = Symbol.for("API.Logger");

// check if the global object has this symbol
// add it if it does not have the symbol, yet
// ------------------------------------------

const globalSymbols = Object.getOwnPropertySymbols(global),
    hasLogger = (globalSymbols.indexOf(APP_LOGGER) > -1);

if (!hasLogger) {
    const bunyan = require('bunyan'),
        path = require('path');

    global[APP_LOGGER] = bunyan.createLogger({
        name: 'slideAPI',
        streams: [
            {
                level: 'info',
                stream: process.stdout
            }
        ]
    });
}

// define the singleton API
// ------------------------

const singleton = {};

Object.defineProperty(singleton, "instance", {
    get: function () {
        return global[APP_LOGGER];
    }
});

// ensure the API is never changed
// -------------------------------

Object.freeze(singleton);

// export the singleton API only
// -----------------------------

module.exports = singleton;