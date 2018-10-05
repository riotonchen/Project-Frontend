<template>
  <div class="item">

    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple" />
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light" />
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple" />
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light" />
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple" />
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light" />
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple" />
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light" />
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple" />
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light" />
      </el-col>
      <el-col :span="6">
        <div class="search">
          <el-input v-model="input" placeholder="請輸入内容" />

        </div>
      </el-col>
      <el-col :span="2">
        <div class="s2">
          <el-button icon="el-icon-search" circle />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="100">
      <el-col :span="12">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户管理" name="first">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
          <el-tab-pane label="配置管理" name="second">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
          <el-tab-pane label="角色管理" name="third">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="12">
        <div class="card">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 5" :key="o" class="text item">
              {{ '列表内容 ' + o }}
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>
          <el-card class="box-card2">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 30" :key="o" class="text item">
              {{ '列表内容 ' + o }}

            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

</script>

<style>
.item {
  padding-top: 2vmin;
  padding-bottom: 2vmin;
  padding-left: 2vmin;
  padding-right: 2vmin;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.tabs {
  height: 20vmin;
}
.card {
  height: 70vmin;
  width: 50vmin;
}
.box-card2 {
  background: #99a9bf;
  height: 300vmin;
}
</style>
