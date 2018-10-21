<template>
  <div class="information_container">
    <title>{{ $t('router.c_information') }}</title>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in 4" :key="item" />
    </el-carousel>
    <el-row :gutter="20">
      <el-col v-for="(o, index) in 1" :span="8" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }" width="20vw">
          <img src="../../assets/images/a.jpg" class="image">
          <div style="padding: 16px;">
            <div>防水噴霧</div>
          </div>
          <div style="padding: 14px;">
            <div>部落客強力推薦！回購率NO.1！</div>
            <div>日本進口專利原料，長效持久雨季必備</div>
            <div class="bottom clearfix" />
          </div>
        </el-card>
      </el-col>
      <el-col v-for="(o, index) in 1" :span="8" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }" width="20vw">
          <img src="../../assets/images/b.jpg" class="image">
          <div style="padding: 16px;">
            <div>率性手拿簡約萬用夾</div>
          </div>
          <div style="padding: 14px;">
            <div>出差必備萬用夾，防撞厚度可安心收納手機、護照等重要物品</div>
            <div>線條簡約，減去厚重感；手拿式織帶ＬＯＧＯ的設計，帶點時尚氛圍</div>
            <div class="bottom clearfix" />
          </div>
        </el-card>
      </el-col>
      <el-col v-for="(o, index) in 1" :span="8" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }" width="20vw">
          <img src="../../assets/images/c.jpg" class="image">
          <div style="padding: 16px;">
            <div>29吋行李箱 PC拉絲鋁框旅行箱</div>
          </div>
          <div style="padding: 14px;">
            <div>專利輔助輪，保護箱殼在顛簸路面免磨損</div>
            <div>6cm靜音飛機輪，靜音滑順超好推</div>
            <div>鋁合金拉桿，伸縮自如，結實耐用</div>
            <div class="bottom clearfix" />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!--<div class="information_collapse">
      <el-collapse v-model="activeName1" accordion>
        <el-collapse-item title="防水噴霧" name="1" stripe>
          <div>
            <el-row>
              <el-col :span="12">
                <el-row>
                  <el-col :span="2">
                    <p>主題：</p>
                  </el-col>
                  <el-col :span="6">
                    <p>防水噴霧</p>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="2">內容：</el-col>
                  <el-col :span="14">
                    <div>部落客強力推薦！回購率NO.1！</div>
                    <div>日本進口專利原料，長效持久雨季必備</div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <div class="information_img">
                  <img src="../../assets/images/a.jpg">
                </div>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>

        <el-collapse-item title="率性手拿簡約萬用夾" name="2">

          <el-row>
            <el-col :span="12">
              <el-row>
                <el-col :span="2">
                  <p>主題：</p>
                </el-col>
                <el-col :span="6">
                  <p>率性手拿簡約萬用夾</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">內容：</el-col>
                <el-col :span="14">
                  <div>出差必備萬用夾，防撞厚度可安心收納手機、護照等重要物品</div>
                  <div>線條簡約，減去厚重感；手拿式織帶ＬＯＧＯ的設計，帶點時尚氛圍</div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <div class="information_img">
                <img src="../../assets/images/b.jpg">
              </div>
            </el-col>
          </el-row>

        </el-collapse-item>
        <el-collapse-item title="29吋行李箱 PC拉絲鋁框旅行箱" name="3">

          <el-row>
            <el-col :span="12">
              <el-row>
                <el-col :span="2">
                  <p>主題：</p>
                </el-col>
                <el-col :span="6">
                  <p>防水噴霧</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">內容：</el-col>
                <el-col :span="14">
                  <div>專利輔助輪，保護箱殼在顛簸路面免磨損</div>
                  <div>6cm靜音飛機輪，靜音滑順超好推</div>
                  <div>鋁合金拉桿，伸縮自如，結實耐用</div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <div class="information_img">
                <img src="../../assets/images/c.jpg">
              </div>
            </el-col>
          </el-row>

        </el-collapse-item>
        <el-collapse-item title="太陽眼鏡 3025-001/51-58(金邊漸層棕鏡面)" name="4">

          <el-row>
            <el-col :span="12">
              <el-row>
                <el-col :span="2">
                  <p>主題：</p>
                </el-col>
                <el-col :span="6">
                  <p>太陽眼鏡 3025-001/51-58(金邊漸層棕鏡面)</p>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">內容：</el-col>
                <el-col :span="14">
                  <div>RAY過濾眩光，BAN阻擋陽光</div>
                  <div>傳奇不朽經典飛官款</div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <div class="information_img">
                <img src="../../assets/images/d.jpg">
              </div>
            </el-col>
          </el-row>

        </el-collapse-item>
      </el-collapse>
  </div>
  -->

    <div class="information_in1" />

  </div>
</template>

<script>

export default {
  data() {
    return {
      activeName1: 'first',
      activeName2: '1',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style>
.information_container {
  padding-right: 2vmax;
  padding-left: 2vmax;
  padding-top: 2vmax;
  padding-bottom: 2vmax;
}
.information_in1 {
  padding-left: 7vmax;
  padding-top: 3vmax;
}
.information_img {
  padding-right: 10vmax;
  padding-top: 3vmax;
  width: 5vmin;
  height: 5vh;
}
.el-icon-plus {
  width: 10vmax;
  height: 10vh;
}
img {
  width: 5vw;
  height: 10vh;
  margin-top: -2vh;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>

<script>
export default {
  data() {
    return {
      currentDate: new Date()
    };
  }
}

</style>
