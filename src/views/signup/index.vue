<template>
  <div class="b1">
    <title>
      註冊
    </title>
    <el-form :model="ruleForm2" :rules="rules2" status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item label="用戶名:">
        <el-input v-model="input" placeholder="請輸入用戶名" />
      </el-form-item>
      <el-form-item label="信箱:">
        <el-input v-model="input" placeholder="E-mail" />
      </el-form-item>
      <el-form-item label="密碼:">
        <el-input v-model="input" placeholder="請混合使用8個字元以上的英數" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">送出</el-button>
        <router-link to="/login2">
          <el-button type="primary">登入2</el-button>
        </router-link>
      </el-form-item>
    </el-form>

  </div>
</template>
<style>
.b1 {
  background: url("../../assets/images/watercolor.svg") no-repeat;
  -moz-background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 48.85vmax;
  font-family: "Microsoft JhengHei";
  position: relative;
  width: 200vmin;

  padding-left: 40vmax;
  padding-right: 25vmax;
  padding-top: 17vmax;
}
</style>
