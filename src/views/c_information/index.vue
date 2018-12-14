<template>
  <div>
    <title>{{ $t('route.c_information') }}</title>
    <div
      v-show="havedata"
      class="app-container"
    >
      <div class="info_carousel">
        <el-carousel>
          <el-carousel-item
            v-for="item in testpic"
            :key="item"
          >
            <div class="infomations_pic">
              <img :src="item.promotion_id.photo">
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="infomation_card">
        <el-card
          v-for="item in testpic"
          :key="item"
          class="infomations_pic"
        >
          <a :href="item.promotion_id.link">
            <img :src="item.promotion_id.photo">
          </a>
          <br>
          <div class="infotext">
            <span>{{ item.promotion_id.name }}</span>
          </div>
        </el-card>
      </div>
    </div>
    <div v-show="nodata">
      <div class="fakebody">
        <div class="loader">
          <span>你的專屬資訊快來了!!!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getinfomations } from '@/api/infomations/getinfomations';
import { getToken } from '@/utils/auth';

export default {
  data() {
    return {
      testpic: [],
      havedata: false,
      nodata: true
    }
  },
  created() {
    this.get_infomations_all()
  },
  methods: {
    get_infomations_all() {
      getinfomations(getToken()).then(res => {
        this.testpic = res.data

        if (this.testpic.length > 0) {
          this.nodata = false
          this.havedata = true
          this.testpic.forEach(items => {
            items.promotion_id.photo.toString().replace('blob:', '')
          })
        } else {
          this.nodata = true
          this.havedata = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fakebody {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  //background: #383636;
  font-family: "Microsoft JhengHei";
  .loader {
    position: relative;
    font-size: 5vw;
    background: rgba(0, 0, 0, 0.5);
    color: #000;
    font-weight: bold;
    letter-spacing: 10px;
    padding: 50px;
    span {
      color: #fff;
      mix-blend-mode: difference;
    }
  }
  .loader:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 10rem;
    height: 100%;
    background: rgba(24, 30, 31, 0.7);
    animation: animate 3s linear infinite;
  }
  @keyframes animate {
    0% {
      left: 0;
    }
    50% {
      left: 80%;
    }
    100% {
      left: 0;
    }
  }
}

.infomation_card {
  margin-left: 5%;
  .infomations_pic {
    width: calc(100% / 4.5);
    text-align: center;
    float: left;
    margin: 10px;
    img {
      width: 10vw;
    }
    .infotext {
      padding-top: 15px;
      padding-bottom: 15px;
    }
  }
  .infomations_pic:hover {
    transform: scale(1.15);
  }
}
.info_carousel {
  el-carousel {
    height: 20vh;
  }
}
.el-carousel__item {
  .infomations_pic {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 30vh;
      padding-top: 4vh;
    }
  }
}
</style>
<style lang="scss">
.el-carousel__button {
  background-color: aqua;
}
</style>

