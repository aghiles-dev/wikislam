const path = require("path");
const { HotModuleReplacementPlugin } = require("webpack");
const { VueLoaderPlugin } = require("vue-loader/lib/index");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const log = require("fancy-log");
const colors = require("ansi-colors");

const executingCommand = process.env.npm_lifecycle_event;
const isProd = executingCommand === "build";
const environment = isProd ? "production" : "development";

const DEV_PORT = 7000;

logEnvironmentVariables();

module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  entry: {
    app: ["@babel/polyfill", "./src/index.ts"]
  },
  output: {
    path: path.join(__dirname, "./dist"),
    chunkFilename: `vendors.js`,
    filename: `app.js`
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  devServer: {
    clientLogLevel: "info",
    compress: true,
    historyApiFallback: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    },
    port: DEV_PORT,
    quiet: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: "vue-style-loader!css-loader!sass-loader",
            sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [ExtractCssChunks.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "static/fonts/[name].[ext]"
          }
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html"
    }),
    new Dotenv({
      path: path.join(__dirname, ".env")
    })
  ]
};

function logEnvironmentVariables() {
  console.log(
    colors.magenta("###################################################")
  );
  _logVariable("NODE_ENV", environment);
  _logVariable("listening on", "http://localhost:" + DEV_PORT);
  console.log(
    colors.magenta("###################################################\n\n")
  );
}

function _logVariable(name = "", value = "") {
  log(name, colors.cyan(value));
}
