const mix = require('laravel-mix');
const webpack = require('webpack'); // これを追加

mix.js('resources/ts/index.tsx', 'public/js/index.js')
   .react()
   .postCss('resources/css/app.css', 'public/css', [
        //
   ])
   .babelConfig({
     presets: [
       ['@babel/preset-env', { modules: false }]
     ]
   })
   .webpackConfig({
        output: {
            chunkFilename: 'js/[name].js?id=[chunkhash]',
            publicPath: '/',
       },
       resolve: {
        extensions: ['.wasm','.tsx', '.ts','.mjs', '.js', '.jsx', '.json']
       },
       plugins: [ // これを追加
           new webpack.DefinePlugin({
             'process.env.REACT_APP_GOOGLE_CLIENT_ID': JSON.stringify(process.env.REACT_APP_GOOGLE_CLIENT_ID),
             'process.env.REACT_APP_GOOGLE_CLIENT_SECRET': JSON.stringify(process.env.REACT_APP_GOOGLE_CLIENT_SECRET),
              'process.env.REACT_APP_GOOGLE_REDIRECT_URI': JSON.stringify(process.env.REACT_APP_GOOGLE_REDIRECT_URI),
           })
       ]
   });

if (mix.inProduction()) {
    mix.version();
}
