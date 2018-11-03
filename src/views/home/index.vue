<template>
  <div>
    <title>
      {{ $t('route.home') }}
    </title>
    <div class="home1-container">
      <el-row class="navbar">
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="4" class="logo">
          <div>
            <router-link to="/">
              <img src="../../assets/images/177.svg" class="logoimg">
            </router-link>
          </div>
        </el-col>
        <el-col :xs="8" :sm="7" :md="7" :lg="7" :xl="6">
          <div class="b1-title">
            <router-link to="/">177&nbsp;一起記
            </router-link>
          </div>
        </el-col>
        <el-col :xs="9" :sm="9" :md="9" :lg="10" :xl="9">
          <div class="signup">
            <router-link to="/member_signup">
              註冊
            </router-link>
          </div>
        </el-col>
        <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
          <div class="login">
            <router-link to="/login">
              登入
            </router-link>
          </div>
        </el-col>
      </el-row>
      <el-row class="head">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="words">
            <div class="title">
              <b>177&nbsp;一起記</b>
            </div>
            <div class="index1">
              ✔ &nbsp; 一向做到最好 <br> ✔ &nbsp; 七大模組應有盡有<br> ✔ &nbsp; 七天每週做你最棒的記帳管家
            </div>
            <div class="index2">
              紙筆的時代已經過去了，讓我們與你<br>一起更聰明，更方便的理財吧！
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="grid-content bg-purple headimg">
            <img src="../../assets/images/computer.svg" class="img1">
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="home2-container">
      <el-row>
        <el-col>
          <div class="h2-title-all">
            <div class="title">
              <b>&nbsp;What's&nbsp;About&nbsp;us&nbsp;?</b>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="carousel">
            <el-carousel height="35vmax">
              <el-carousel-item>
                <div class="carou-in1">
                  <div class="item1" />
                  <div class="item2">
                    <img src="../../assets/images/investment.svg" class="img2">
                    <div class="text2">
                      簡單明瞭的分析圖表<br>讓您一眼了解自己錢財<br>何去何從
                    </div>
                  </div>
                  <div class="item3">
                    <img src="../../assets/images/smartphone.png" class="img3">
                    <div class="text3">
                      我們仔細聆聽您的聲音<br>將您的字字句句記錄下來<br>快速的紀錄您的所有
                    </div>
                  </div>
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <div class="carou-in2">
                  <div class="item1" />
                  <div class="item2">
                    <img src="../../assets/images/group.svg" class="img2">
                    <div class="text2">
                      每次跟朋友出去遊玩<br>卻發現每次都收不齊錢<br>我們幫您分攤憂愁
                    </div>
                  </div>
                  <div class="item3">
                    <img src="../../assets/images/qr-code.svg" class="img3">
                    <div class="text3">
                      一掃即紀錄<br>免去打字的困擾<br>快速記錄你的所有
                    </div>
                  </div>
                  <div class="item4">
                    <img src="../../assets/images/megaphone.svg" class="img4">
                    <div class="text4">
                      讓我們分析你的所有<br>給你專屬的優惠<br>即時享有不再錯過
                    </div>
                  </div>
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <div class="carou-in3">
                  <div class="item1" />
                  <div class="item2">
                    <img src="../../assets/images/upload.svg" class="img2">
                    <div class="text2">
                      雲端自動同步<br>時時記錄你的生活<br>不怕遺失每一分每一秒
                    </div>
                  </div>
                  <div class="item3">
                    <img src="../../assets/images/credit-card.svg" class="img3">
                    <div class="text3">
                      覺得卡片太多皮包太厚嗎<br>讓我們幫你管理所有<br>一機在手多卡帶著走
                    </div>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="home3-container">
      <el-row>
        <el-col :span="8">
          <img src="../../assets/images/177.png" class="b3-logo">
        </el-col>
        <el-col :span="12">
          <div class="b3-title">
            <div class="title">
              <b>177&nbsp;一起記</b>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div class="b3-title">
            <div class="title2">
              <b>Start&nbsp;With&nbsp;Us&nbsp;for&nbsp;free&nbsp;!</b>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <img src="../../assets/images/google-play.svg" class="b3-google">
        </el-col>
        <el-col :span="3">
          <img src="../../assets/images/google-plus.svg" class="b3-gplus">
        </el-col>
        <el-col :span="8">
          <img src="../../assets/images/facebook.svg" class="b3-fb">
        </el-col>
      </el-row>
      <el-row class="lasttext">
        <el-col :span="19" class="team">
          製作團隊：中國文化大學&nbsp;&nbsp;資訊管理學系<br>吳彥霆，陳維宗，張弘毅，江建呈，王昭勝，王俐璇，胡芷菱，李耕渼
        </el-col>
        <el-col :span="4" class="contact">
          聯絡方式：<br>177together@gmail.com
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.home1-container {
  background: url("../../assets/images/background-comp.svg") no-repeat;
  -moz-background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 48.85vmax;
  font-family: "Microsoft JhengHei";
  position: relative;
}
.home2-container {
  background: url("../../assets/images/background-comp2.svg") no-repeat;
  -moz-background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 48.85vmax;
  font-family: "Microsoft JhengHei";
  position: relative;
}
.home3-container {
  //background: url("../../assets/images/background-comp.svg") no-repeat;
  //background-color: #f9f9f9;
  -moz-background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 48.85vmax;
  font-family: "Microsoft JhengHei";
  position: relative;
}
.footer-container {
  background: url("../../assets/images/background-comp2.svg") no-repeat;
  -moz-background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 5rem;
  font-family: "Microsoft JhengHei";
  position: relative;
}
.navbar {
  padding-top: 1rem;
}
.logoimg {
  width: 2.5rem;
  float: right;
  padding-right: 0.3rem;
}
.b1-title {
  font-size: 1.3rem;
  padding-top: 0.5rem;
  color: antiquewhite;
}
.signup {
  text-align: right;
  font-size: 1.3rem;
  padding-top: 0.5rem;
  color: antiquewhite;
}
.login {
  text-align: left;
  font-size: 1.3rem;
  padding-left: 2vmax;
  padding-top: 0.5rem;
  color: antiquewhite;
}
.img1 {
  width: 38vmax;
  padding-top: 12vmax;
  padding-left: 5.5vmax;
}

.words .title {
  font-size: 7vmax;
  padding-left: 12.5vmax;
  padding-top: 8vmax;
  color: antiquewhite;
}
.words .index1 {
  font-size: 2vmax;
  padding-left: 17.5vmax;
  padding-top: 6vmax;
  color: antiquewhite;
}
.words .index2 {
  font-size: 2vmax;
  padding-left: 12.5vmax;
  padding-top: 6vmax;
  color: antiquewhite;
}
.h2-title-all .title {
  color: #444444;
  font-size: 6vmax;
  text-align: center;
  //background-color: aqua;
  padding-top: 1.5vmax;
}

.team {
  font-size: 1.5rem;
  padding-top: 0.7rem;
  padding-left: 0.5rem;
}
.contact {
  font-size: 1.5rem;
  padding-top: 0.7rem;
}
.carousel {
  //background-color: aqua;
  width: 90%;
  margin: auto;
  padding-top: 6vmax;
}
.carou-in1 {
  position: relative;
}
.carou-in1 .item1 {
  position: absolute;
}
.carou-in1 .item2 {
  position: absolute;
}
.carou-in1 .item3 {
  position: absolute;
}
.carou-in1 .item4 {
  position: absolute;
}
.carou-in1 .item2 .img2 {
  width: 12vmax;
  margin-left: 22vmax;
  margin-top: 5vmax;
}
.carou-in1 .item3 .img3 {
  width: 12vmax;
  margin-left: 54vmax;
  margin-top: 5vmax;
}
.carou-in1 .item2 .text2 {
  font-size: 1.8vmax;
  text-align: center;
  margin-left: 19.5vmax;
  margin-top: 3vmax;
}
.carou-in1 .item3 .text3 {
  font-size: 1.8vmax;
  text-align: center;
  margin-left: 50.25vmax;
  margin-top: 3vmax;
}
.carou-in2 {
  position: relative;
}
.carou-in2 .item1 {
  position: absolute;
}
.carou-in2 .item2 {
  position: absolute;
}
.carou-in2 .item3 {
  position: absolute;
}
.carou-in2 .item4 {
  position: absolute;
}
.carou-in2 .item2 .img2 {
  width: 12vmax;
  margin-left: 11.8vmax;
  margin-top: 5vmax;
}
.carou-in2 .item3 .img3 {
  width: 12vmax;
  margin-left: 39.5vmax;
  margin-top: 5vmax;
}
.carou-in2 .item4 .img4 {
  width: 12vmax;
  margin-left: 65vmax;
  margin-top: 5vmax;
}
.carou-in2 .item2 .text2 {
  font-size: 1.8vmax;
  text-align: center;
  margin-left: 9vmax;
  margin-top: 3vmax;
}
.carou-in2 .item3 .text3 {
  font-size: 1.8vmax;
  text-align: center;
  margin-left: 35vmax;
  margin-top: 3vmax;
}
.carou-in2 .item4 .text4 {
  font-size: 1.8vmax;
  text-align: center;
  margin-left: 61.1vmax;
  margin-top: 3vmax;
}
.carou-in3 {
  position: relative;
}
.carou-in3 .item1 {
  position: absolute;
}
.carou-in3 .item2 {
  position: absolute;
}
.carou-in3 .item3 {
  position: absolute;
}
.carou-in3 .item4 {
  position: absolute;
}
.carou-in3 .item2 .img2 {
  width: 12vmax;
  margin-left: 22vmax;
  margin-top: 5vmax;
}
.carou-in3 .item3 .img3 {
  width: 12vmax;
  margin-left: 54vmax;
  margin-top: 5vmax;
}
.carou-in3 .item2 .text2 {
  font-size: 1.8vmax;
  text-align: center;
  margin-left: 19.5vmax;
  margin-top: 3vmax;
}
.carou-in3 .item3 .text3 {
  font-size: 1.8vmax;
  text-align: center;
  margin-left: 50.25vmax;
  margin-top: 3vmax;
}
.b3-title .title {
  color: black;
  font-size: 8vmax;
  text-align: left;
  //background-color: aqua;
  padding-top: 8vmax;
}
.b3-title .title2 {
  color: black;
  font-size: 3vmax;
  text-align: center;
  //background-color: aqua;
  padding-top: 2vmax;
}
.b3-logo {
  width: 12vmax;
  float: right;
  padding-right: 2.2vmax;
  padding-top: 7vmax;
}
.b3-google {
  width: 12vmax;
  padding-right: 2.2vmax;
  padding-top: 2.5vmax;
  float: right;
}
.b3-gplus {
  width: 12vmax;
  padding-right: 2.2vmax;
  padding-top: 2.5vmax;
}
.b3-fb {
  width: 12vmax;
  padding-right: 2vmax;
  padding-top: 2.5vmax;
}
.lasttext {
  color: rgba(133, 133, 133, 0.8);
  padding-top: 9.5vmax;
}
.lasttext .team {
  font-size: 1vmax;
}
.lasttext .contact {
  font-size: 1vmax;
  padding-left: 8vmax;
}
</style>
<script>
</script>

