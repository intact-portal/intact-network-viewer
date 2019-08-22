const path = require('path');

module.exports = {
    entry: './src/network_viewer_entry.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'intact_network.js',
        library: 'IntactGraph',
        /*libraryTarget: 'commonjs2',*/
        path: path.resolve(__dirname, 'lib')
    }
};