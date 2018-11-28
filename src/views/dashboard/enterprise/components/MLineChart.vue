<template>

  <div :class="className" :style="{height:height,width:width}" />

</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { formatdate_inc_time } from '@/utils/index'
import 'zrender/lib/svg/svg'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '50%'
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
      const done = start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      const dtwo = start.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
      const dthr = start.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
      const oridate = start.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
      const pone = start.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
      const ptwo = start.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
      const pthr = start.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
      this.chart.setOption({
        title: {
          text: '月報表收支出',
          textStyle: {
            color: '#000080',
            fontSize: '17',
            fontFamily: 'Microsoft JhengHei',
            fontWeight: 'bolder'
          }
        },
        xAxis: {
          data: [
            formatdate_inc_time(done, 'yy-mm'),
            formatdate_inc_time(dtwo, 'yy-mm'),
            formatdate_inc_time(dthr, 'yy-mm'),
            formatdate_inc_time(oridate, 'yy-mm'),
            formatdate_inc_time(pone, 'yy-mm'),
            formatdate_inc_time(ptwo, 'yy-mm'),
            formatdate_inc_time(pthr, 'yy-mm')],
          boundaryGap: false,
          axisTick: {
            show: true
          }
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '3%',
          top: '20%',
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
              color: '#FF44AA',
              lineStyle: {
                color: '#FF44AA',
                width: 5
              },
              areaStyle: {
                color: '#FFb7dd'
              }
            }
          },
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          },
          smooth: true,
          type: 'line',
          data: paydata,
          animationDuration: 3500,
          animationEasing: 'cubicInOut'
        },
        {
          name: '收入',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#0066ff',
              lineStyle: {
                color: '#0066ff',
                width: 5
              },
              areaStyle: {
                color: '#77ddFF'
              }
            }
          },
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          },
          data: indata,
          animationDuration: 3500,
          animationEasing: 'quadraticOut'
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons', 'svg')
      this.setOptions(this.chartData)
    }
  }
}
</script>

