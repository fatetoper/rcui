
// 导入button组件
import RAlert from './alert'
import RButton from './button'
import RMessage from './message'
import RMessageBox from './message-box'
// 组件列表
const components = [
  RButton,
  RAlert,
  RMessage,
  RMessageBox
]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，那么所有的组件都会被注册
const install = function (Vue, opts = {}) {


  // 判断是否安装
  if (install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component))

  
  Vue.prototype.$RUICHI = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };

  // Vue.prototype.$loading = Loading.service;
  // Vue.prototype.$msgbox = RMessageBox;
  // Vue.prototype.$alert = RMessageBox.alert;
  // Vue.prototype.$confirm = RMessageBox.confirm;
  // Vue.prototype.$prompt = RMessageBox.prompt;
  // Vue.prototype.$notify = Notification;
  Vue.prototype.$message = RMessage;


}



// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  RButton,
  RAlert,
  RMessage,
  RMessageBox

}
