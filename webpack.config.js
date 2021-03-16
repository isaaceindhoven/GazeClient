const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        GazeJs: "./src/GazeJs.ts",
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].js",
        library: {
            name: 'GazeJs',
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
