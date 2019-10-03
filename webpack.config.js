const path = require('path');

module.exports = {
    devServer: {
        contentBase: './public',
        hot: true
    },
    entry: {
        app: ["./src/index.js"]
    },
    output: {
        path: path.resolve("./dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    }
};