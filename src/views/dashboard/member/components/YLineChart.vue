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
      default: '59vw'
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
    setOptions({ paydata, indata } = {}) {
      const start = new Date()
      const done = start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 12 * 3)
      const dtwo = start.setTime(start.getTime() + 3600 * 1000 * 24 * 30 * 12)
      const dthr = start.setTime(start.getTime() + 3600 * 1000 * 24 * 30 * 12)
      const oridate = start.setTime(start.getTime() + 3600 * 1000 * 24 * 30 * 12)
      const pone = start.setTime(start.getTime() + 3600 * 1000 * 24 * 30 * 12)
      const ptwo = start.setTime(start.getTime() + 3600 * 1000 * 24 * 30 * 12)
      const pthr = start.setTime(start.getTime() + 3600 * 1000 * 24 * 30 * 12)
      this.chart.setOption({
        title: {
          text: '年報表收支出'
        },
        xAxis: {
          data: [
            formatdate_inc_time(done, 'yyyy'),
            formatdate_inc_time(dtwo, 'yyyy'),
            formatdate_inc_time(dthr, 'yyyy'),
            formatdate_inc_time(oridate, 'yyyy'),
            formatdate_inc_time(pone, 'yyyy'),
            formatdate_inc_time(ptwo, 'yyyy'),
            formatdate_inc_time(pthr, 'yyyy')],
          boundaryGap: false,
          axisTick: {
            show: true
          }
        },
        grid: {
          left: 10,
          right: 20,
          bottom: 20,
          top: 60,
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

        legend: {
          data: ['支出', '收入']
        },

        series: [{
          name: '支出',
          itemStyle: {
            normal: {
              color: '#CC0000',
              lineStyle: {
                color: '#CC0000',
                width: 5
              },
              areaStyle: {
                color: '#FF3333'
              }
            }
          },
          smooth: true,
          type: 'line',
          data: paydata,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '收入',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 5
              },
              areaStyle: {
                color: '#00FFFF'
              }
            }
          },
          data: indata,
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

