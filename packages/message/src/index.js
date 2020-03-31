import Vue from 'vue';
import Main from './main.vue';
import { PopupManager } from '../../../src/utils/popup'; // 弹窗层级管理工具
import { isVNode } from '../../../src/utils/vdom';
let MessageConstructor = Vue.extend(Main);  // vue组件子类

let instance;
let instances = [];
let seed = 1;


const Message = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }
  let userOnClose = options.onClose;
  let id = 'message_' + seed++;

  options.onClose = function() {
    // 需要在使用组件时以Message为名再引用一次
    Message.close(id, userOnClose);
  };
  // instance是个vue组件实例
  instance = new MessageConstructor({
    data: options
  });
  instance.id = id;
  instance.itemHeight = options.itemHeight?options.itemHeight:48;
  instance.itemSpacing = options.itemSpacing?options.itemSpacing:16;
  if (isVNode(instance.message)) {
    instance.$slots.default = [instance.message];
    instance.message = null;
   
  }
  //
  instance.$mount();
  document.body.appendChild(instance.$el);

  let verticalOffset = options.offset || 20;
  instances.forEach(item => {
    console.log("item.offsetHeight:",item)
    
    verticalOffset += item.itemHeight + item.itemSpacing;
  });
  instance.verticalOffset = verticalOffset;

  instance.visible = true;
  instance.$el.style.zIndex = PopupManager.nextZIndex();
  instances.push(instance);
  return instance;
};

['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    return Message(options);
  };
});
Message.close = function(id, userOnClose) {
  let len = instances.length;
  let index = -1;
  let removedHeight;
  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      removedHeight = instances[i].itemHeight;
      index = i;
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
  if (len <= 1 || index === -1 || index > instances.length - 1) return;
  for (let i = index; i < len - 1 ; i++) {
    let dom = instances[i].$el;
    dom.style['top'] =
      parseInt(dom.style['top'], 10) - removedHeight - instance.itemSpacing + 'px';
  }
};
Message.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};
export default Message;
