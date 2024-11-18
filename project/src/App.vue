<!-- <template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style> -->
<template>
  <!-- <div id="app">
    <router-view/>
  </div> -->
  <div id="app">
    <el-container
      style="
        height: 100vh;
        border: 0px solid #000000;
        margin: 0;
        border: none;
        padding: 0;
      "
    >
      <!-- style： 隐藏滚动条  去掉白边-->
      <!-- 侧边栏 -->
      <!-- <el-aside style="width: 12%; position: fixed; height: 100%">
        <asideNav v-if="$route.meta.show"></asideNav>
      </el-aside> -->
      <!-- 主页面 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import asideNav from "@/components/asideNav";
// import store from "./store";
// import router from "./router";

export default {
  name: "App",
  components: {
    // asideNav,
  },
  // data() {
  //   return {
  //     isLogin: store.state.isLogin,//读取islogin
  //   };
  // },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.el-main {
  padding: 0 !important;
}

html,
body {
  height: 100%;
  margin: 0;
  border: 0;
  padding: 0;
}
</style>
