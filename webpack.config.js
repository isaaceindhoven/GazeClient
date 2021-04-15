const path = require('path');

const defaultConfig = {
    mode: 'production',
    devtool: 'source-map',
    entry: "./src/GazeClient.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "GazeClient.js",
        library: {
            name: 'GazeClient',
            type: 'var',
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

const amdConfig = Object.assign({}, defaultConfig);
amdConfig.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: "GazeClient.amd.js",
    library: {
        type: 'amd',
        export: 'default'
    }
};

module.exports = [defaultConfig, amdConfig];
