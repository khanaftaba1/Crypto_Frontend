const path = require('path');

module.exports = {
    // Your webpack configuration settings
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify")
        }
    },
    // Other webpack configuration options
};
