const path = require('path');

module.exports = {
    devServer: {
        contentBase: './public',
        public: 'http://localhost:8080',
        host: '0.0.0.0',
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