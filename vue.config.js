const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir); // path.join(__dirname)设置绝对路径
}

module.exports = {
  devServer: {
    host: '0.0.0.0',
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
      .set('common', resolve('./src/common'));
  },
};
