const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: "./src/GazeClient.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "GazeClient.js",
        library: {
            name: 'GazeClient',
            type: 'umd',
            export: 'default'
        }
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    }
};
