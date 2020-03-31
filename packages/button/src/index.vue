<template>
  <button 
    class="r-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'r-button--' + type : '',
      buttonSize ? 'r-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'r-button',
    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },
    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean
    },

    computed: {
      _elFormItemSize() {
        return (this.elFormItem || {}).elFormItemSize;
      },
      buttonSize() {
        return this.size || this._elFormItemSize || (this.$RUICHI || {}).size;
      },
      buttonDisabled() {
        return this.disabled || (this.elForm || {}).disabled;
      }
    },

    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>

<style scoped>
  .r-button {
      display: inline-block;
      padding: 3px 6px;
      background: #000;
      color: #fff;
  }

.r-input-group__append .r-button,
.r-input-group__prepend .r-button {
	display: inline-block;
	margin: -10px -20px
}

.r-input-group__append button.r-button,
.r-input-group__prepend button.r-button {
	border-color: transparent;
	background-color: transparent;
	color: inherit;
	border-top: 0;
	border-bottom: 0
}

.r-input-group__append .r-button,
.r-input-group__prepend .r-button {
	font-size: inherit
}

.r-button {
	display: inline-block;
	line-height: 1;
	white-space: nowrap;
	cursor: pointer;
	background: #FFF;
	border: 1px solid #DCDFE6;
	color: #606266;
	-webkit-appearance: none;
	text-align: center;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	outline: 0;
	margin: 0;
	-webkit-transition: .1s;
	transition: .1s;
	font-weight: 500;
	padding: 12px 20px;
	font-size: 14px;
	border-radius: 4px
}

.r-button+.r-button {
	margin-left: 10px
}

.r-button:focus,
.r-button:hover {
	color: #409EFF;
	border-color: #c6e2ff;
	background-color: #ecf5ff
}

.r-button:active {
	color: #3a8ee6;
	border-color: #3a8ee6;
	outline: 0
}

.r-button::-moz-focus-inner {
	border: 0
}

.r-button [class*=r-icon-]+span {
	margin-left: 5px
}

.r-button.is-plain:focus,
.r-button.is-plain:hover {
	background: #FFF;
	border-color: #409EFF;
	color: #409EFF
}

.r-button.is-active,
.r-button.is-plain:active {
	color: #3a8ee6;
	border-color: #3a8ee6
}

.r-button.is-plain:active {
	background: #FFF;
	outline: 0
}

.r-button.is-disabled,
.r-button.is-disabled:focus,
.r-button.is-disabled:hover {
	color: #C0C4CC;
	cursor: not-allowed;
	background-image: none;
	background-color: #FFF;
	border-color: #EBEEF5
}

.r-button.is-disabled.r-button--text {
	background-color: transparent
}

.r-button.is-disabled.is-plain,
.r-button.is-disabled.is-plain:focus,
.r-button.is-disabled.is-plain:hover {
	background-color: #FFF;
	border-color: #EBEEF5;
	color: #C0C4CC
}

.r-button.is-loading {
	position: relative;
	pointer-events: none
}

.r-button.is-loading:before {
	pointer-events: none;
	content: '';
	position: absolute;
	left: -1px;
	top: -1px;
	right: -1px;
	bottom: -1px;
	border-radius: inherit;
	background-color: rgba(255, 255, 255, .35)
}

.r-button.is-round {
	border-radius: 20px;
	padding: 12px 23px
}

.r-button.is-circle {
	border-radius: 50%;
	padding: 12px
}

.r-button--primary {
	color: #FFF;
	background-color: #409EFF;
	border-color: #409EFF
}

.r-button--primary:focus,
.r-button--primary:hover {
	background: #66b1ff;
	border-color: #66b1ff;
	color: #FFF
}

.r-button--primary.is-active,
.r-button--primary:active {
	background: #3a8ee6;
	border-color: #3a8ee6;
	color: #FFF
}

.r-button--primary:active {
	outline: 0
}

.r-button--primary.is-disabled,
.r-button--primary.is-disabled:active,
.r-button--primary.is-disabled:focus,
.r-button--primary.is-disabled:hover {
	color: #FFF;
	background-color: #a0cfff;
	border-color: #a0cfff
}

.r-button--primary.is-plain {
	color: #409EFF;
	background: #ecf5ff;
	border-color: #b3d8ff
}

.r-button--primary.is-plain:focus,
.r-button--primary.is-plain:hover {
	background: #409EFF;
	border-color: #409EFF;
	color: #FFF
}

.r-button--primary.is-plain:active {
	background: #3a8ee6;
	border-color: #3a8ee6;
	color: #FFF;
	outline: 0
}

.r-button--primary.is-plain.is-disabled,
.r-button--primary.is-plain.is-disabled:active,
.r-button--primary.is-plain.is-disabled:focus,
.r-button--primary.is-plain.is-disabled:hover {
	color: #8cc5ff;
	background-color: #ecf5ff;
	border-color: #d9ecff
}

.r-button--success {
	color: #FFF;
	background-color: #67C23A;
	border-color: #67C23A
}

.r-button--success:focus,
.r-button--success:hover {
	background: #85ce61;
	border-color: #85ce61;
	color: #FFF
}

.r-button--success.is-active,
.r-button--success:active {
	background: #5daf34;
	border-color: #5daf34;
	color: #FFF
}

.r-button--success:active {
	outline: 0
}

.r-button--success.is-disabled,
.r-button--success.is-disabled:active,
.r-button--success.is-disabled:focus,
.r-button--success.is-disabled:hover {
	color: #FFF;
	background-color: #b3e19d;
	border-color: #b3e19d
}

.r-button--success.is-plain {
	color: #67C23A;
	background: #f0f9eb;
	border-color: #c2e7b0
}

.r-button--success.is-plain:focus,
.r-button--success.is-plain:hover {
	background: #67C23A;
	border-color: #67C23A;
	color: #FFF
}

.r-button--success.is-plain:active {
	background: #5daf34;
	border-color: #5daf34;
	color: #FFF;
	outline: 0
}

.r-button--success.is-plain.is-disabled,
.r-button--success.is-plain.is-disabled:active,
.r-button--success.is-plain.is-disabled:focus,
.r-button--success.is-plain.is-disabled:hover {
	color: #a4da89;
	background-color: #f0f9eb;
	border-color: #e1f3d8
}

.r-button--warning {
	color: #FFF;
	background-color: #E6A23C;
	border-color: #E6A23C
}

.r-button--warning:focus,
.r-button--warning:hover {
	background: #ebb563;
	border-color: #ebb563;
	color: #FFF
}

.r-button--warning.is-active,
.r-button--warning:active {
	background: #cf9236;
	border-color: #cf9236;
	color: #FFF
}

.r-button--warning:active {
	outline: 0
}

.r-button--warning.is-disabled,
.r-button--warning.is-disabled:active,
.r-button--warning.is-disabled:focus,
.r-button--warning.is-disabled:hover {
	color: #FFF;
	background-color: #f3d19e;
	border-color: #f3d19e
}

.r-button--warning.is-plain {
	color: #E6A23C;
	background: #fdf6ec;
	border-color: #f5dab1
}

.r-button--warning.is-plain:focus,
.r-button--warning.is-plain:hover {
	background: #E6A23C;
	border-color: #E6A23C;
	color: #FFF
}

.r-button--warning.is-plain:active {
	background: #cf9236;
	border-color: #cf9236;
	color: #FFF;
	outline: 0
}

.r-button--warning.is-plain.is-disabled,
.r-button--warning.is-plain.is-disabled:active,
.r-button--warning.is-plain.is-disabled:focus,
.r-button--warning.is-plain.is-disabled:hover {
	color: #f0c78a;
	background-color: #fdf6ec;
	border-color: #faecd8
}

.r-button--danger {
	color: #FFF;
	background-color: #F56C6C;
	border-color: #F56C6C
}

.r-button--danger:focus,
.r-button--danger:hover {
	background: #f78989;
	border-color: #f78989;
	color: #FFF
}

.r-button--danger.is-active,
.r-button--danger:active {
	background: #dd6161;
	border-color: #dd6161;
	color: #FFF
}

.r-button--danger:active {
	outline: 0
}

.r-button--danger.is-disabled,
.r-button--danger.is-disabled:active,
.r-button--danger.is-disabled:focus,
.r-button--danger.is-disabled:hover {
	color: #FFF;
	background-color: #fab6b6;
	border-color: #fab6b6
}

.r-button--danger.is-plain {
	color: #F56C6C;
	background: #fef0f0;
	border-color: #fbc4c4
}

.r-button--danger.is-plain:focus,
.r-button--danger.is-plain:hover {
	background: #F56C6C;
	border-color: #F56C6C;
	color: #FFF
}

.r-button--danger.is-plain:active {
	background: #dd6161;
	border-color: #dd6161;
	color: #FFF;
	outline: 0
}

.r-button--danger.is-plain.is-disabled,
.r-button--danger.is-plain.is-disabled:active,
.r-button--danger.is-plain.is-disabled:focus,
.r-button--danger.is-plain.is-disabled:hover {
	color: #f9a7a7;
	background-color: #fef0f0;
	border-color: #fde2e2
}

.r-button--info {
	color: #FFF;
	background-color: #909399;
	border-color: #909399
}

.r-button--info:focus,
.r-button--info:hover {
	background: #a6a9ad;
	border-color: #a6a9ad;
	color: #FFF
}

.r-button--info.is-active,
.r-button--info:active {
	background: #82848a;
	border-color: #82848a;
	color: #FFF
}

.r-button--info:active {
	outline: 0
}

.r-button--info.is-disabled,
.r-button--info.is-disabled:active,
.r-button--info.is-disabled:focus,
.r-button--info.is-disabled:hover {
	color: #FFF;
	background-color: #c8c9cc;
	border-color: #c8c9cc
}

.r-button--info.is-plain {
	color: #909399;
	background: #f4f4f5;
	border-color: #d3d4d6
}

.r-button--info.is-plain:focus,
.r-button--info.is-plain:hover {
	background: #909399;
	border-color: #909399;
	color: #FFF
}

.r-button--info.is-plain:active {
	background: #82848a;
	border-color: #82848a;
	color: #FFF;
	outline: 0
}

.r-button--info.is-plain.is-disabled,
.r-button--info.is-plain.is-disabled:active,
.r-button--info.is-plain.is-disabled:focus,
.r-button--info.is-plain.is-disabled:hover {
	color: #bcbec2;
	background-color: #f4f4f5;
	border-color: #e9e9eb
}

.r-button--medium {
	padding: 10px 20px;
	font-size: 14px;
	border-radius: 4px
}

.r-button--medium.is-round {
	padding: 10px 20px
}

.r-button--medium.is-circle {
	padding: 10px
}

.r-button--small {
	padding: 9px 15px;
	font-size: 12px;
	border-radius: 3px
}

.r-button--small.is-round {
	padding: 9px 15px
}

.r-button--small.is-circle {
	padding: 9px
}

.r-button--mini,
.r-button--mini.is-round {
	padding: 7px 15px
}

.r-button--mini {
	font-size: 12px;
	border-radius: 3px
}

.r-button--mini.is-circle {
	padding: 7px
}

.r-button--text {
	border-color: transparent;
	color: #409EFF;
	background: 0 0;
	padding-left: 0;
	padding-right: 0
}

.r-button--text:focus,
.r-button--text:hover {
	color: #66b1ff;
	border-color: transparent;
	background-color: transparent
}

.r-button--text:active {
	color: #3a8ee6;
	border-color: transparent;
	background-color: transparent
}

.r-button--text.is-disabled,
.r-button--text.is-disabled:focus,
.r-button--text.is-disabled:hover {
	border-color: transparent
}

.r-button-group .r-button--danger:last-child,
.r-button-group .r-button--danger:not(:first-child):not(:last-child),
.r-button-group .r-button--info:last-child,
.r-button-group .r-button--info:not(:first-child):not(:last-child),
.r-button-group .r-button--primary:last-child,
.r-button-group .r-button--primary:not(:first-child):not(:last-child),
.r-button-group .r-button--success:last-child,
.r-button-group .r-button--success:not(:first-child):not(:last-child),
.r-button-group .r-button--warning:last-child,
.r-button-group .r-button--warning:not(:first-child):not(:last-child),
.r-button-group>.r-dropdown>.r-button {
	border-left-color: rgba(255, 255, 255, .5)
}

.r-button-group .r-button--danger:first-child,
.r-button-group .r-button--danger:not(:first-child):not(:last-child),
.r-button-group .r-button--info:first-child,
.r-button-group .r-button--info:not(:first-child):not(:last-child),
.r-button-group .r-button--primary:first-child,
.r-button-group .r-button--primary:not(:first-child):not(:last-child),
.r-button-group .r-button--success:first-child,
.r-button-group .r-button--success:not(:first-child):not(:last-child),
.r-button-group .r-button--warning:first-child,
.r-button-group .r-button--warning:not(:first-child):not(:last-child) {
	border-right-color: rgba(255, 255, 255, .5)
}

.r-button-group {
	display: inline-block;
	vertical-align: middle
}

.r-button-group::after,
.r-button-group::before {
	display: table;
	content: ""
}


.r-button-group::after {
	clear: both
}

.r-button-group>.r-button {
	float: left;
	position: relative
}

.r-button-group>.r-button.is-disabled {
	z-index: 1
}

.r-button-group>.r-button:first-child {
	border-top-right-radius: 0;
	border-bottom-right-radius: 0
}

.r-button-group>.r-button:last-child {
	border-top-left-radius: 0;
	border-bottom-left-radius: 0
}

.r-button-group>.r-button:first-child:last-child {
	border-radius: 4px
}

.r-button-group>.r-button:first-child:last-child.is-round {
	border-radius: 20px
}

.r-button-group>.r-button:first-child:last-child.is-circle {
	border-radius: 50%
}

.r-button-group>.r-button:not(:first-child):not(:last-child) {
	border-radius: 0
}

.r-button-group>.r-button.is-active,
.r-button-group>.r-button:active,
.r-button-group>.r-button:focus,
.r-button-group>.r-button:hover {
	z-index: 1
}

.r-button-group>.r-dropdown>.r-button {
	border-top-left-radius: 0;
	border-bottom-left-radius: 0
}

</style>
