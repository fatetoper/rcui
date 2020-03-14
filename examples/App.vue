<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
     
    </div>
     <r-button type="primary">button</r-button>
     <r-alert></r-alert>
    <router-view/>
  </div>
</template>

<script>
  // import { use } from 'main/locale';
  // import zhLocale from 'main/locale/lang/zh-CN';
  // import enLocale from 'main/locale/lang/en';
  // import esLocale from 'main/locale/lang/es';
  // import frLocale from 'main/locale/lang/fr';

  // const lang = location.hash.replace('#', '').split('/')[1] || 'zh-CN';
  // const localize = lang => {
  //   switch (lang) {
  //     case 'zh-CN':
  //       use(zhLocale);
  //       break;
  //     case 'es':
  //       use(esLocale);
  //       break;
  //     case 'fr-FR':
  //       use(frLocale);
  //       break;
  //     default:
  //       use(enLocale);
  //   }
  // };
  // localize(lang);

  export default {
    name: 'app',

  };
</script>

<style >
@import './assets/index.css';
</style>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
