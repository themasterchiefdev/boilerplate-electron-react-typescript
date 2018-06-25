const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin"); //installed via npm
// Config directories
const SRC_RENDERERDIR = path.resolve(__dirname, "src/index.tsx");
const SRC_MAINDIR = path.resolve(__dirname, "src/program.ts");
const OUTPUT_DIR = path.resolve(__dirname, "build");

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = [SRC_RENDERERDIR];

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
			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
		]
	}
	// When importing a module whose path matches one of the following, just
	// assume a corresponding global variable exists and use that instead.
	// This is important because it allows us to avoid bundling all of our
	// dependencies, which allows browsers to cache those libraries between builds.
	// externals: {
	// 	react: "React",
	// 	"react-dom": "ReactDOM"
	// }
};
module.exports = [
	Object.assign(
		{
			target: "electron-main",
			entry: { main: SRC_MAINDIR }
		},
		commonConfig
	),
	Object.assign(
		{
			target: "electron-renderer",
			entry: { index: SRC_RENDERERDIR }
		},
		commonConfig
	)
];
