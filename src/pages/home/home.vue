<template>
  <div>
    <title>
      <%= htmlWebpackPlugin.options.title %>
    </title>
    <div class="header">
      <el-row>
        <el-col :span="24" class="navbar">
          <Navbar></Navbar>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="topdiv">
          <topdiv></topdiv>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<style lang="less">
html,
body {
  height: 100%;
  margin: 0;
  font-family: Microsoft JhengHei;
}
a {
  text-decoration: none;
  //font-size: 2vmin;
  //font-family: Microsoft YaHei;
}
.header {
  //background-color: aqua;
  background: url("../../assets/images/background-comp.svg") no-repeat center
    center fixed;
  background-size: cover;
}
</style>

<script>
import topdiv from "../../components/topdiv.vue";
import Navbar from "../../components/navbar.vue";
export default {
  data() {
    return {};
  },
  components: {
    topdiv,
    Navbar
  }
};
</script>
