// 如果想要 hotModule 模块热重载
if (module.hot) {
  module.hot.accept('./core/load.js', function() {
    require('./core/load')
    console.log('热替换')
  });
}
