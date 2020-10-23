/*
 * @Author: fatetoper
 * @Date: 2020-10-14 18:17:02
 * @LastEditors: fatetoper
 * @LastEditTime: 2020-10-16 00:15:56
 * @Modultype: Component
 * @Usage: import/global/prototype
 * @Description: Do not edit
 * @FilePath: \ant-design-vue\components\Uploader\index.js
 */

import Vue from 'vue';
import Main from './uploader.vue';
import { PopupManager } from 'ant-design-vue/_util/popup'; // 弹窗层级管理工具
import zIndexGlobal from 'ant-design-vue/_util/popup/zIndex';
import { isVNode } from 'ant-design-vue/_util/vnode';
const UploaderConstructor = Vue.extend(Main); // vue组件子类

let instance;
const instances = [];
let seed = 1;

const Uploader = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  if (typeof options === 'string') {
    options = {
      info: options,
    };
  }
  const userOnClose = options.onClose; // close回调函数
  const id = 'uploader_' + seed++;
  (zIndexGlobal || {}).zIndex = options.zIndex;
  options.onClose = function() {
    // 需要在使用组件时以Uploader为名再引用一次
    Uploader.close(id, userOnClose);
  };
  // instance是个vue组件实例
  instance = new UploaderConstructor({
    data: options,
  });
  instance.id = id;
  if (isVNode(instance.info)) {
    instance.$slots.default = [instance.info];
    instance.info = null;
  }
  //
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.visible = true;
  instance.$el.style = { zIndex: PopupManager.nextZIndex() };
  instances.push(instance);
  return instance;
};

Uploader.close = function(id, userOnClose) {
  const len = instances.length;
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
  for (let i = index; i < len - 1; i++) {
    const dom = instances[i].$el;
    dom.style['top'] = parseInt(dom.style['top'], 10) - removedHeight - instance.itemSpacing + 'px';
  }
};
Uploader.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};
export default Uploader;
