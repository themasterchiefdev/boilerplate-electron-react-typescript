/**
 * Import Node dependencies
 */
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/**
 * Config directories
 * * SRC_MAINDIR 	 -> This is directory for the main Electron process.
 * * SRC_RENDERERDIR -> This is directory for the renderer Electron process.
 * * OUTPUT_DIR      -> This is directory where the compiled JS files will be placed..
 */
const SRC_RENDERERDIR = path.resolve(__dirname, "src/index.tsx");
const SRC_MAINDIR = path.resolve(__dirname, "src/program.ts");
const OUTPUT_DIR = path.resolve(__dirname, "build");

// Un-comment this when excluding folders in the common config.
// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
// const defaultInclude = [SRC_RENDERERDIR];

// The path(s) that should be cleaned
let pathsToClean = ["build"];

// The clean options to use
let cleanOptions = {
	verbose: true,
	dry: false
};

/**
 * This is the common config for webpack.
 */

const commonConfig = {
	output: {
		path: OUTPUT_DIR,
		filename: "[name].js"
	},
	mode: "development",
	node: {
		__dirname: false
	},
	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".jsx", ".js", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "awesome-typescript-loader",
				exclude: /node_modules/
			},
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
			{
				test: /\.css$/,

				use: ["style-loader", "css-loader"]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(pathsToClean, cleanOptions),
		new MiniCssExtractPlugin({
			filename: "'css/[name].css"
		}),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "./src/assets/index.html",
			title: "React-TypeScript-Electron Starter"
		})
	]
};

/**
 * We are defining two exports for the webpack.
 * We load the common config object in to module.exports.
 */
module.exports = [
	/**
	 * This targets Electron Main Process.
	 */
	Object.assign(
		{
			target: "electron-main",
			entry: { main: SRC_MAINDIR }
		},
		commonConfig
	),
	/**
	 * This targets Electron Renderer process.
	 */
	Object.assign(
		{
			target: "electron-renderer",
			entry: { index: SRC_RENDERERDIR }
		},
		commonConfig
	)
];
