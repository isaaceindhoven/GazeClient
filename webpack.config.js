const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        GazeClient: "./src/GazeClient.ts",
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].js",
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
