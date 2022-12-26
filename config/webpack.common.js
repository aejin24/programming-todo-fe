/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ProvidePlugin, DefinePlugin } = require("webpack");
const { join } = require("path");

require("dotenv").config({ path: join(__dirname, "..", ".env") });

module.exports = {
    entry: {
        vendor: ["react", "react-dom"],
        app: join(__dirname, "..", "src", "index.tsx"),
    },
    output: {
        path: join(__dirname, "..", "dist"),
        filename: "[name].bundle.js",
        clean: true,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            components: join(__dirname, "..", "src", "components"),
            pages: join(__dirname, "..", "src", "pages"),
            services: join(__dirname, "..", "src", "services"),
            assets: join(__dirname, "..", "src", "assets"),
            constants: join(__dirname, "..", "src", "constants"),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: ["ts-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]?[hash]",
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ProvidePlugin({ React: "react" }),
        new HtmlWebpackPlugin({ template: join(__dirname, "..", "public", "index.html") }),
        new DefinePlugin({ "process.env": JSON.stringify(process.env) }),
    ],
};
