const path = require("path");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            loader: "babel-loader",
            test: /\.js$/,
            exclude: /node_modules/
        }]
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: path.join(__dirname, "public"),
    }
};

//loader lets you customize the behaviour of webpack when it loads a given file
// when webpack sees .js, we can do something with it --> in our case, run through babel
// or convert .scss to .css
// devtool helps us find exactly where errors can lie

