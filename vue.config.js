const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir); // path.join(__dirname)设置绝对路径
}

module.exports = {
  devServer: {
    host: '0.0.0.0',
  },

  // vant自定义样式
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: 'true; @import \'@/assets/global.less\';',
          },
        },
      },
    },
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/global.less'),
      ],
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('./src'))
      .set('assets', resolve('./src/assets'))
      .set('views', resolve('./src/views'))
      .set('components', resolve('./src/components'))
      .set('utils', resolve('./src/utils'))
      .set('common', resolve('./src/common'))
      .set('api', resolve('./src/api'));
  },
};
