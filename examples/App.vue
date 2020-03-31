<template>
  <div id="app">
    <!-- <r-alert
      type="success"
      center
      allWidth=30
      allHeight=30
      position=absolute
      left=35
      top=100
      show-icon>
    >
      <template v-slot:title>
        <h1>I`m Alert</h1>
      </template>
      <template v-slot>
        <h2>alert is niubi!!</h2>
        <textarea name="" id="" cols="20" rows="4">wudi</textarea>
      </template>
    </r-alert> -->
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>  
      <router-view/>
      <!-- <r-button type="success">button</r-button> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    methods:{
      setMessage(i){
          // console.log("window:",window)
          // console.log("this:",this)
          this.$message({
            message: `恭喜你，这是${i+1}条成功消息`,
            type: 'success',
            offset:40,
            duration:0,
            itemHeight:20,
            itemSpacing:20
          });
      }
    },
    mounted(){
      this.$message({
          message: `恭喜你，成功发送消息`,
          type: 'error', 
          offset:40,
       duration:2000
        });
      
      for(let i=0;i<3;i++){
      this.setMessage(i);
        // await setTimeout(1000)
      }
      // this.$alert('这是一段内容', '标题名称', {
      //   confirmButtonText: '确定',
      //   callback: action => {
      //     this.$message({
      //       type: 'info',
      //       message: `action: ${ action }`
      //     });
      //   }
      // });

    }

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
