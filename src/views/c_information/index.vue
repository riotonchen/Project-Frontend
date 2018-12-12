<template>
  <div class="app-container">
    <title>{{ $t('route.c_information') }}</title>
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
</template>

<script>
import { getinfomations } from '@/api/infomations/getinfomations'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      testpic: []
    }
  },
  created() {
    this.get_infomations_all()
  },
  methods: {
    get_infomations_all() {
      getinfomations(getToken()).then(res => {
        this.testpic = res.data

        this.testpic.forEach(items => {
          items.promotion_id.photo.toString().replace('blob:', '')
        })
        console.log(this.testpic)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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

