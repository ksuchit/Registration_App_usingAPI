const { NODE_ENV } = process.env
const inDevelopment = NODE_ENV === "development";

module.exports = {
  
  module: {
    rules: [
     
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: !inDevelopment ? /node_modules\/(?!(@atlaskit\/tooltip))/ : /(node_modules)/,
        options: {
          cacheDirectory: inDevelopment,
          cacheCompression: false,
        },
      },
      
    ],
  }

}