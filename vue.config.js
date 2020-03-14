module.exports = {
  lintOnSave: false,
  pages:{
    index:{
      entry:'examples/main.js',
      template:'public/index.html',
      filename:'index.html'
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
        .add('/packages')
        .end()
      .use('babel')
        .loader('babel-loader');

    config.resolve.alias
    .set('@', '/examples')
  },
   // 配置高于chainWebpack中关于 css loader 的配置
   css: {
    // 是否开启支持 foo.module.css 样式
    modules: false,

    // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
    extract: true,

    // 是否构建样式地图，false 将提高构建速度
    sourceMap: false,

    // css预设器配置项
    // loaderOptions: {
    //   css: {
    //     // options here will be passed to css-loader
    //   },

    //   postcss: {
    //     // options here will be passed to postcss-loader
    //   }
    // }
  },

}
