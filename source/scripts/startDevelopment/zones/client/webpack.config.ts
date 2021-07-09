import Path from 'path'
import { Configuration } from 'webpack'

export const clientWebpackConfig = {
  mode: 'development',
  devtool: false,
  entry: Path.resolve(__dirname, './DevelopmentClient.tsx'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: Path.resolve(__dirname, './tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: '/dist',
    filename: 'client.bundle.js',
  },
} as Configuration
