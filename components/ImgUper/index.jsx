import ImgUper from './imguper';
import Base from '../base';

ImgUper.install = function(Vue) {
  Vue.use(Base);
  Vue.component(ImgUper.name, ImgUper);
};

export default ImgUper;
