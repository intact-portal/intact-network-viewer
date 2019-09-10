const path = require('path');

module.exports = {
    entry: './src/network_viewer_entry.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: [{
                    loader: 'expose-loader',
                    options: 'IntactGraph'
                }, {
                    loader: 'ts-loader'
                }]

            },
            {
                include: [/node_modules/],
                test: /\.css$/,
                use: [
                { loader: 'style-loader' },
                // css-loader
                {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }
            ] }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js','.css' ]
    },
    output: {
        filename: 'intact_network.js',
        library: 'IntactGraph',
        /*libraryTarget: 'commonjs2',*/
        path: path.resolve(__dirname, 'lib')
    }
};