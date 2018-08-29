<template>
    <div class="topdiv">
        <div class="left">
            <div class="title">
                <p>
                    177&nbsp;一起記
                </p>
            </div>
            <div class="index1">
                1 &nbsp; 一向做到最好 <br> 7 &nbsp; 七大模組應有盡有<br> 7 &nbsp; 一周七天做你最棒的記帳管家
            </div>
            <div class="index2">
                孤軍奮戰的時代已經過去了，讓我們與你一起創造美好未來吧！
            </div>
        </div>
        <div class="right">
            <el-row :gutter="5">
                <el-col span="1" pull="1">
                    <img src="../assets/images/computer.svg" class="img1" />
                    <img src="../assets/images/star.svg" class="img2" />
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<style lang="less" scoped>
@font-face {
  font-family: SentyTEA;
  src: url("../assets/fonts/SentyTEA.ttf") format("woff2");
}
.topdiv {
  width: 100vmin;
}
.img1 {
  width: 60vmin;
  height: 60vmin;
  padding-left: 55vmax;
  padding-top: 10vmin;
  z-index: 1;
}
.img2 {
  width: 60vmin;
  height: 60vmin;
  padding-left: 54vmax;
  margin-top: -68vmin;
  z-index: 2;
}
div {
  height: 70vmin;
}
.left {
  float: left;
  margin-top: -3vmin;
}
.right {
  float: left;
  margin-top: -33vmax;
  margin-left: 14vmin;
}
.title {
  font-family: SentyTEA, Microsoft JhengHei;
  color: aliceblue;
  font-size: 12vmin;
  padding-top: 3vmin;
  padding-left: 15vmax;
  float: left;
}
.index1 {
  float: left;
  font-family: SentyTEA, Microsoft JhengHei;
  color: aliceblue;
  margin-left: -22vmax;
  padding-top: 15vmax;
  font-size: 4vmin;
}
.index2 {
  float: left;
  font-family: SentyTEA, Microsoft JhengHei;
  color: aliceblue;
  margin-left: 15vmax;
  margin-top: -23vmax;
  font-size: 4vmin;
}
</style>
