<template>
  <div>
    <a-form :form="form" @submit="handleSubmit" class="ant-advanced-form">
      <!-- <div class="control">
        <a-button v-if="editorType === 'add'" type="primary" html-type="submit">添加</a-button>
        <a-button v-if="editorType === 'modify'">修改</a-button>
        <a-button>存草稿</a-button>
        <a-button type="primary" @click="closeEditor">取消</a-button>
      </div> -->
      <div id="table">
        <!-- <a-tabs type="card" @change="callback">
          <a-tab-pane key="1" tab="常规信息"> -->
            <a-img-uper
              :formItemLayout="formItemLayout"
              :editorType="editType"
              :formTable="formTable"
              :id="fieldName"
              :host="host"
              :dirname="dirname"
              :defaultFileList="defaultFileList"
            />
          <!-- </a-tab-pane>
        </a-tabs> -->
      </div>
    </a-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'artDeteils' }),
      formTable: {
        title: 'zhejiang',
        shortTitle: 'zj',
        flag: ['A', 'B'],
        tag: '',
        weight: '10',
        num: '',
        litpic: 'sss',
        litpic1: '',
        source: '',
        writer: '',
        typeid: '',
        typeid2: '',
        body: '',
        dirname: '',
      },
      host: 'localhost',
      fieldName: 'litpic',
      dirname: '',
      formItemLayout: {
        labelCol: {
          xs: { span: 4 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 8 },
          sm: { span: 18 },
        },
      },
      editType: 'add',
      defaultFileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-3',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-4',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-5',
          name: 'image.png',
          status: 'error',
        },
      ],
    };
  },
  props: {
    editorType: {
      type: String,
      // required: true,
      default: 'add',
    },
    imgDefUrl: {
      type: String,
      required: false,
      default: 'http://localhost:8081/upload/def/NoImg0.png',
    },
    editorFn: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    count() {
      return this.expand ? 11 : 7;
    },
    submitObj() {
      const obj = { ...this.formTable };
      obj.body = this.msg;
      return obj;
    },
    imgpreviewStyle() {
      const st = `background:url(${this.imgDefUrl}) no-repeat center;`;
      return st;
    },
  },
  methods: {
    callback(key) {
      // console.log(key)
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.formTable = values;
          console.log('submitObj=>', this.submitObj);
        } else {
          console.log('submit failed');
        }
      });
    },
    closeEditor() {
      this.$emit('switchEditor', 'close');
      this.editorFn();
    },
  },
};
</script>
<style lang="less" scoped>
.editor {
  position: absolute;
  left: 0px;
  top: 9%;
  width: 95%;
  height: 90%;
  background: white;
  z-index: 1040;
}

.control {
  button {
    margin: 5px;
  }
  button:first-child {
    margin-left: 20px;
  }
}

#table {
  margin: 20px;
  tr {
    display: flex;
  }
}

.ant-advanced-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  .ant-form-item {
    display: flex;
  }
  .ant-form-item-control-wrapper {
    flex: 1;
  }
}

#components-form-demo-advanced-search {
  .ant-form {
    max-width: none;
  }
  .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
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
</style>
