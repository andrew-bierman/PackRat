const path = require('path');
// const {
//   WranglerJsCompatWebpackPlugin,
// } = require("wranglerjs-compat-webpack-plugin");


module.exports = (env) => {
  // Use env.<YOUR VARIABLE> here:
  console.log('Goal: ', env.goal); // 'local'
  console.log('Production: ', env.production); // true
  console.log(env)

  return {
    entry: './src/index.ts',
    output: {
      filename: 'worker.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'cheap-module-source-map',
    target: 'webworker',
    mode: 'development',
   
  };
};