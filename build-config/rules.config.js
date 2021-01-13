module.exports = [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader"
        }
    },

    {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
    },

    {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
    },

    {
        test: /\.html$/,
        use: ['html-loader']
    },
    {
        test: /\.svg$/,
        use:  [
            {
              loader: 'svg-url-loader',
              options: {
                limit: 10000,
              },
            },
          ]
    }
    
]