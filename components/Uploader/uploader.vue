<!--
 * @Author: fatetoper
 * @Date: 2020-07-07 20:46:43
 * @LastEditors: fatetoper
 * @LastEditTime: 2020-10-22 12:02:18
 * @Modultype: Component
 * @Usage: import
 * @Description: Do not edit
 * @FilePath: \ant-design-vue\components\Uploader\uploader.vue
-->
<template>
  <a-modal
    id="uploader"
    :title="title"
    :visible="visible"
    :zIndex="zIndex"
    :width="width"
    :maskClosable="maskClosable"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div style="height:55vh">
      <!-- <Upload
        :action="action"
        :list-type="listType"
        :file-list="defaultFileList"
        :dirName="dirName"
        @select="handleSelect"
        @change="handleChange"
      >
        <div>
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </Upload> -->
      <a-upload
        :action="action"
        :list-type="listType"
        :file-list="defaultFileList"
        :dirName="dirName"
        @select="handleSelect"
        @change="handleChange"
        @remove="handleRemove"
      >
        <!-- <div v-if="defaultFileList.length < 8"> -->
        <div>
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
    </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    action: {
      type: String,
      default: ' http://localhost:8000/8081/imgupload',
    },
    title: {
      type: String,
      default: 'Title',
    },
    listType: {
      type: String,
      default: 'picture-card',
    },
  },
  data() {
    return {
      value: undefined,
      expand: false,
      visible: true,
      confirmLoading: false,
      maskClosable: false,
      url: 'xxx',
      zIndex: 4,
      width: '45%',
      defaultFileList: [],
      select: '0',
      urlReciver: {},
      urlData: () => {},
      dirName: '',
    };
  },
  computed: {
    imgUrl: {
      get: function() {
        let value = '';
        if (this.select !== '0') {
          value = this.defaultFileList.find(item => {
            return item.uid === this.select;
          }).url;
        }
        return value;
      },
      set: function() {},
    },
  },
  methods: {
    close() {
      this.visible = false;
    },
    imgUrlCutter(imgUrl, baseUrl) {
      // https://zos.alipayobjects.com/rmsportal/
      return imgUrl;
    },
    handleOk(e) {
      this.confirmLoading = true;
      this.imgUrl = this.imgUrlCutter(this.imgUrl);
      this.urlReciver.value = this.imgUrl;
      this.urlData(this.imgUrl);
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 10);
    },
    handleCancel(e) {
      this.visible = false;
    },
    handleSelect(file) {
      if (file.uid && file.status === 'done') {
        this.select = file.uid;
        this.defaultFileList.map(item => {
          if (item.uid === this.select) {
            if (item.select === 'select') {
              this.$set(item, 'select', 'UnSelect');
              this.select = '0';
            } else this.$set(item, 'select', 'select');
          } else {
            item.select === 'select' && this.$set(item, 'select', 'UnSelect');
          }
        });
      }
    },
    handleChange(info) {
      this.defaultFileList = info.fileList;
    },
    handleRemove(info) {
      console.log('==>handleRemove==>info', info);
    },
  },
};
</script>
<style>
.uploader {
  position: fixed;
  left: 0px;
  top: 0%;
  width: 100%;
  height: 100%;
  margin: auto;
  background: white;
  z-index: 3;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

/* .ant-upload-list-picture .ant-upload-list-item-select,
.ant-upload-list-picture-card .ant-upload-list-item-select {
    border: 3px;
    border-radius: 2px;
    border-color: rgb(35, 55, 235);
} */
</style>
