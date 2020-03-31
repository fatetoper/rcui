<template>
  <transition name="r-alert-fade">
    <div
      class="r-alert"
      :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]"
      v-show="visible"
      role="alert"
      :style= "{ 
        'width': allWidth + 'vw' ,
        'height': allHeight + 'vh',
        'position': position,
        'left':left+'vw',
        'top':top+'vh'
        }"
    >
      <i class="r-alert__icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
      <div class="r-alert__content">
        <span class="r-alert__title" :class="[ isBoldTitle ]" v-if="title || $slots.title">
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="r-alert__description" v-if="$slots.default && !description"><slot></slot></p>
        <p class="r-alert__description" v-if="description && !$slots.default">{{ description }}</p>
        <i class="r-alert__closebtn" :class="{ 'is-customed': closeText !== '', 'el-icon-close': closeText === '' }" v-show="closable" @click="close()">{{closeText}}</i>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  const TYPE_CLASSES_MAP = {
    'success': 'el-icon-success',
    'warning': 'el-icon-warning',
    'error': 'el-icon-error'
  };
  export default {
    name: 'r-alert',

    props: {
      title: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'info'
      },
      closable: {
        type: Boolean,
        default: true
      },
      closeText: {
        type: String,
        default: ''
      },
      showIcon: Boolean,
      center: Boolean,
      effect: {
        type: String,
        default: 'light',
        validator: function(value) {
          return ['light', 'dark'].indexOf(value) !== -1;
        }
      },
      allWidth:{
        type: String,
        default: '100'
      },
      allHeight:{
        type: String,
        default: ''
      },
      position:{
        type: String,
        default: 'static'
      },
      left:{
        type: String,
        default: '0'
      },
      top:{
        type: String,
        default: '0'
      },
    },

    data() {
      return {
        visible: true
      };
    },

    methods: {
      close() {
        this.visible = false;
        this.$emit('close');
      }
    },

    computed: {
      typeClass() {
        return `r-alert--${ this.type }`;
      },

      iconClass() {
        return TYPE_CLASSES_MAP[this.type] || 'el-icon-info';
      },

      isBigIcon() {
        return this.description || this.$slots.default ? 'is-big' : '';
      },

      isBoldTitle() {
        return this.description || this.$slots.default ? 'is-bold' : '';
      }
    }
  };
</script>


<style scoped>

.r-alert {
	/* width: 100%; */
	padding: 8px 16px;
	margin: 0;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	position: relative;
  background-color: #FFF;
  border-radius: 4px;
	overflow: hidden;
	opacity: 1;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-transition: opacity .2s;
	transition: opacity .2s
}

.r-alert.is-center {
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center
}

.r-alert--success {
	background-color: #f0f9eb;
	color: #67C23A
}

.r-alert--success .r-alert__description {
	color: #67C23A
}

.r-alert--info {
	background-color: #f4f4f5;
	color: #909399
}

.r-alert--info .r-alert__description {
	color: #909399
}

.r-alert--warning {
	background-color: #fdf6ec;
	color: #E6A23C
}

.r-alert--warning .r-alert__description {
	color: #E6A23C
}

.r-alert--error {
	background-color: #fef0f0;
	color: #F56C6C
}

.r-alert--error .r-alert__description {
	color: #F56C6C
}

.r-alert__content {
	display: table-cell;
	padding: 0 8px
}

.r-alert__icon {
	font-size: 16px;
	width: 16px
}

.r-alert__icon.is-big {
	font-size: 28px;
	width: 28px
}

.r-alert__title {
	font-size: 13px;
	line-height: 18px
}

.r-alert__title.is-bold {
	font-weight: 700
}

.r-alert .r-alert__description {
	font-size: 12px;
	margin: 5px 0 0
}

.r-alert__closebtn {
	font-size: 12px;
	color: #C0C4CC;
	opacity: 1;
	position: absolute;
	top: 12px;
	right: 15px;
	cursor: pointer
}

.r-alert__closebtn.is-customed {
	font-style: normal;
	font-size: 13px;
	top: 9px
}

.r-alert-fade-enter,
.r-alert-fade-leave-active {
	opacity: 0
}

</style>