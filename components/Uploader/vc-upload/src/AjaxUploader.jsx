import PropTypes from '../../../_util/vue-types';
import BaseMixin from '../../../_util/BaseMixin';
import partition from 'lodash/partition';
import classNames from 'classnames';
import defaultRequest from './request';
import getUid from './uid';
import attrAccept from './attr-accept';
import traverseFileTree from './traverseFileTree';
import { getListeners } from '../../../_util/props-util';
// import { bindCallback } from 'c:/users/administrator/appdata/local/microsoft/typescript/3.9/node_modules/rxjs/index'

const upLoadPropTypes = {
  componentTag: PropTypes.string,
  // style: PropTypes.object,
  prefixCls: PropTypes.string,
  name: PropTypes.string,
  // className: PropTypes.string,
  multiple: PropTypes.bool,
  directory: PropTypes.bool,
  disabled: PropTypes.bool,
  accept: PropTypes.string,
  // children: PropTypes.any,
  // onStart: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  action: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  headers: PropTypes.object,
  beforeUpload: PropTypes.func,
  customRequest: PropTypes.func,
  // onProgress: PropTypes.func,
  withCredentials: PropTypes.bool,
  openFileDialogOnClick: PropTypes.bool,
  transformFile: PropTypes.func,
  dirName: PropTypes.string,
};

const AjaxUploader = {
  inheritAttrs: false,
  name: 'ajaxUploader',
  mixins: [BaseMixin],
  props: upLoadPropTypes,
  data() {
    this.reqs = {};
    return {
      uid: getUid(),
    };
  },
  mounted() {
    this._isMounted = true;
  },
  beforeDestroy() {
    this._isMounted = false;
    this.abort();
  },
  methods: {
    onChange(e) {
      console.log(
        'ajax-uploader==>onChange==>e:',
        e,
        ' &&&&ajax-uploader==>onChange==>e.target.files:',
        e.target.files,
      );
      const files = e.target.files;
      this.uploadFiles(files);
      this.reset();
    },
    onClick() {
      const el = this.$refs.fileInputRef;
      if (!el) {
        return;
      }
      el.click();
    },
    onKeyDown(e) {
      if (e.key === 'Enter') {
        this.onClick();
      }
    },
    onFileDrop(e) {
      const { multiple } = this.$props;
      e.preventDefault();
      if (e.type === 'dragover') {
        return;
      }
      if (this.directory) {
        traverseFileTree(e.dataTransfer.items, this.uploadFiles, _file =>
          attrAccept(_file, this.accept),
        );
      } else {
        const files = partition(Array.prototype.slice.call(e.dataTransfer.files), file =>
          attrAccept(file, this.accept),
        );
        let successFiles = files[0];
        const errorFiles = files[1];
        if (multiple === false) {
          successFiles = successFiles.slice(0, 1);
        }
        this.uploadFiles(successFiles);

        if (errorFiles.length) {
          this.$emit('reject', errorFiles);
        }
      }
    },
    uploadFiles(files) {
      const postFiles = Array.prototype.slice.call(files);
      postFiles
        .map(file => {
          file.uid = getUid();
          return file;
        })
        .forEach(file => {
          this.upload(file, postFiles);
        });
    },
    upload(file, fileList) {
      file.dirname = this.dirName;
      if (!this.beforeUpload) {
        // always async in case use react state to keep fileList
        return setTimeout(() => this.post(file), 0);
      }

      const before = this.beforeUpload(file, fileList);
      if (before && before.then) {
        before
          .then(processedFile => {
            const processedFileType = Object.prototype.toString.call(processedFile);
            if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
              return this.post(processedFile);
            }
            return this.post(file);
          })
          .catch(e => {
            console && console.log(e); // eslint-disable-line
          });
      } else if (before !== false) {
        setTimeout(() => this.post(file), 0);
      }
    },
    post(file) {
      if (!this._isMounted) {
        return;
      }
      const { $props: props } = this;
      let { data } = props;
      const { transformFile = originFile => originFile } = props;
      new Promise(resolve => {
        const { action, dirName } = this;
        if (typeof action === 'function') {
          return resolve(action(file));
        }
        resolve([action, dirName]);
      }).then(([action, dirname]) => {
        const { uid } = file;
        const request = this.customRequest || defaultRequest;
        const transform = Promise.resolve(transformFile(file)).catch(e => {
          console.error(e); // eslint-disable-line no-console
        });
        let headers = { ...this.headers };
        if (!this.headers.dirname) {
          headers = { dirname: dirname };
        }
        transform.then(transformedFile => {
          if (typeof data === 'function') {
            data = data(file);
          }
          // ?????
          const requestOption = {
            action,
            filename: this.name,
            data,
            dirname,
            file: transformedFile,
            headers,
            withCredentials: this.withCredentials,
            method: props.method || 'post',
            onProgress: e => {
              this.$emit('progress', e, file);
            },
            onSuccess: (ret, xhr) => {
              delete this.reqs[uid];
              this.$emit('success', ret, file, xhr, this.url.data.data);
            },
            onError: (err, ret) => {
              delete this.reqs[uid];
              this.$emit('error', err, ret, file);
            },
          };
          const callback = res => {
            this.url = res;
          };
          this.reqs[uid] = request(requestOption, callback);
          // ?????开始上传流程==file为input得到的file对象
          // https://developer.mozilla.org/zh-CN/docs/Web/API/File
          this.$emit('start', file);
        });
      });
    },
    reset() {
      this.setState({
        uid: getUid(),
      });
    },
    abort(file) {
      const { reqs } = this;
      if (file) {
        let uid = file;
        if (file && file.uid) {
          uid = file.uid;
        }
        if (reqs[uid] && reqs[uid].abort) {
          reqs[uid].abort();
        }
        delete reqs[uid];
      } else {
        Object.keys(reqs).forEach(uid => {
          if (reqs[uid] && reqs[uid].abort) {
            reqs[uid].abort();
          }

          delete reqs[uid];
        });
      }
    },
  },
  render() {
    const { $props, $attrs } = this;
    const {
      componentTag: Tag,
      prefixCls,
      disabled,
      multiple,
      accept,
      directory,
      openFileDialogOnClick,
    } = $props;
    const cls = classNames({
      [prefixCls]: true,
      [`${prefixCls}-disabled`]: disabled,
    });
    const events = disabled
      ? {}
      : {
          click: openFileDialogOnClick ? this.onClick : () => {},
          keydown: openFileDialogOnClick ? this.onKeyDown : () => {},
          drop: this.onFileDrop,
          dragover: this.onFileDrop,
        };
    const tagProps = {
      on: {
        ...getListeners(this),
        ...events,
      },
      attrs: {
        role: 'button',
        tabIndex: disabled ? null : '0',
      },
      class: cls,
    };
    // console.log('ajax-uploader==>this.$slots.default)==>', this.$slots.default)
    return (
      <Tag {...tagProps}>
        <input
          id={$attrs.id}
          type="file"
          ref="fileInputRef"
          onClick={e => e.stopPropagation()} // https://github.com/ant-design/ant-design/issues/19948
          key={this.uid}
          style={{ display: 'none' }}
          accept={accept}
          directory={directory ? 'directory' : null}
          webkitdirectory={directory ? 'webkitdirectory' : null}
          multiple={multiple}
          onChange={this.onChange}
        />
        {this.$slots.default}
      </Tag>
    );
  },
};

export default AjaxUploader;
