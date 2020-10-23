<!--
 * @Author: fatetoper
 * @Date: 2020-09-20 09:30:37
 * @LastEditors: fatetoper
 * @LastEditTime: 2020-10-22 13:25:45
 * @Modultype: Component
 * @Usage: import/global/prototype
 * @Description: Do not edit
 * @RequiredConponents: Uploader a-row a-col a-form-item a-input a-button
 * @FilePath: \ant-design-vue\components\ImgUper\ImgUper.vue
-->
<template>
  <a-row :gutter="24" style="{ display: 'flex';}">
    <a-col :span="8" style="{ display: 'block' }">
      <a-form-item v-bind="formItemLayout" label="首页图">
        <a-input
          v-decorator="[
            id,
            {
              initialValue: formTable[this.id],
              rules: [{ message: 'Please upload your picture!', whitespace: true }],
            },
          ]"
        />
        <!-- <a-input value='2'></a-input> -->
      </a-form-item>
    </a-col>
    <a-col :span="3" style="{ display: 'block' }">
      <a-form-item v-bind="formItemLayout" label="">
        <a-button @click="handleBrowse(id)">浏览...</a-button>
      </a-form-item>
    </a-col>
    <a-col :span="3" style="{ display: 'block' }">
      <a-form-item v-bind="formItemLayout" label="预览">
        <div class="imgpreview" :style="imgpreviewStyle">
          <img :src="litpic" alt="" />
        </div>
      </a-form-item>
    </a-col>
  </a-row>
</template>
<script>
export default {
  name: 'AImgUper',
  data() {
    return {};
  },
  props: {
    dirname: {
      type: String,
      required: true,
      default: '',
    },
    host: {
      type: String,
      required: true,
      default: 'localhost',
    },
    id: {
      type: String,
      required: true,
      default: 'litpic',
    },
    editorType: {
      type: String,
      required: true,
      default: 'add',
    },
    imgDefUrl: {
      type: String,
      required: false,
      default: 'http://localhost:8081/upload/def/NoImg0.png',
    },
    formItemLayout: {
      type: Object,
      required: false,
      default: () => {
        return {
          labelCol: {
            xs: { span: 4 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 8 },
            sm: { span: 18 },
          },
        };
      },
    },
    formTable: {
      type: Object,
      required: false,
      default: () => {
        return {
          title: 'zhejiang',
          shortTitle: 'zj',
          flag: ['A', 'B'],
          tag: '',
          weight: '10',
          num: '',
          litpic: '',
          litpic1: '',
          source: '',
          writer: '',
          typeid: '',
          typeid2: '',
          body: '',
          dirname: '',
        };
      },
    },
    defaultFileList: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    litpic() {
      const url = this.formTable[this.id];
      const reg = /[a-zA-z]+:\/\/[^\s]*/;
      let imgUrl;
      if (reg.test(url)) {
        imgUrl = this.formTable[this.id];
      } else {
        imgUrl = 'http://' + this.host + this.formTable[this.id];
      }
      return imgUrl;
    },
    imgpreviewStyle() {
      const st = `background:url(${this.imgDefUrl}) no-repeat center;`;
      return st;
    },
  },
  methods: {
    handleBrowse(id) {
      const urlReciver = document.querySelector(`#artDeteils_${id}`);
      const urlData = id => {
        return urlData => {
          this.formTable[id] = urlData;
        };
      };
      // urlReciver, urlData, defaultFileList: required
      console.log(
        'this.$uploader()==>',
        this.$uploader({
          zIndex: 2003,
          urlReciver: urlReciver,
          urlData: urlData(id),
          dirName: this.dirname,
          defaultFileList: this.defaultFileList,
        }),
      );
    },
    // ,
    // showPreImg (url,defUrl) {
    // }
  },
};
</script>
<style lang="less">
.ant-row .ant-form-item {
  display: flex;
}
.imgpreview {
  height: 120px;
  width: 150px;
  margin-left: 10px;
  margin-top: -35px;
  margin-bottom: 20px;
  img {
    height: 120px;
    width: 150px;
  }
}

// .ant-upload-list-item-removed {

// }
</style>
