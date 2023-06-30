const mix = require('laravel-mix');

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
   });
   

if (mix.inProduction()) {
    mix.version();
}
