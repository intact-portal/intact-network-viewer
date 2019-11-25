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
                        modules: false
                    }
                }
            ] },
            {
                test: /\.(png|svg|jpg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js','.css','.svg','jpg' ]
    },
    output: {
        filename: 'intact_network.js',
        library: 'IntactGraph',
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, 'build')
    },
    output: {
        filename: 'intact_network_for_html.js',
        library: 'IntactGraph',
        path: path.resolve(__dirname, 'build')
    },
    optimization: {
    minimize: false
},
};