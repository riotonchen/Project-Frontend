<template>

  <div :class="className" :style="{height:height,width:width}" />

</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { formatdate_inc_time } from '@/utils/index'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }

    // 監聽側邊變化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions({ expectedData, actualData } = {}) {
      const start = new Date()
      const done = start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      const dtwo = start.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
      const dthr = start.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
      const oridate = start.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
      const pone = start.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
      const ptwo = start.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
      const pthr = start.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
      this.chart.setOption({
        xAxis: {
          data: [
            formatdate_inc_time(done, 'mm'),
            formatdate_inc_time(dtwo, 'mm'),
            formatdate_inc_time(dthr, 'mm'),
            formatdate_inc_time(oridate, 'mm'),
            formatdate_inc_time(pone, 'mm'),
            formatdate_inc_time(ptwo, 'mm'),
            formatdate_inc_time(pthr, 'mm')],
          boundaryGap: false,
          axisTick: {
            show: true
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: true
          }
        },
        /*
        legend: {
          data: ['expected', 'actual']
        },
        */
        series: [{
          name: 'expected', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: 'actual',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
<style lang="scss">
.accounting_title_col {
  padding: 15px;
  background-color: #fff;
  text-align: center;
  font-size: 1.2vw;
  font-weight: bold;
}
</style>

