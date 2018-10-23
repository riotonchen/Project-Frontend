<template>
  <div class="accounting_container">
    <title>
      {{ $t('route.c_accounting') }}
    </title>
    <el-container>

      <el-main>

        <el-table :data="tableData" height="60vh" style="width:100%">

          <el-table-column :label="$t('c_accounting_view.papertime')" width="135rem">
            <template slot-scope="scope">
              <el-input v-model="input" :placeholder="$t('c_accounting_view.amount')" class="accounting" />
              <span style="margin-left: 10px">{{ scope.row.papertime }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('c_accounting_view.accountname')" width="120rem">
            <template slot-scope="scope">
              <el-select v-model="value" :placeholder="$t('c_accounting_view.choose')" class="accounting">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <span style="margin-left: 10px">{{ scope.row.account }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('c_accounting_view.class')" width="120rem">

            <template slot-scope="scope">

              <div class="block">
                <span class="demonstration" />
                <el-cascader :options="options" placeholder="試試搜索" filterable />

                <span style="margin-left: 10px">{{ scope.row.account }}</span>
              </div>
            </template>

          </el-table-column>

          <el-table-column :label="$t('c_accounting_view.project')" width="120rem">
            <template slot-scope="scope">
              <el-select v-model="value" :placeholder="$t('c_accounting_view.choose')" class="accounting">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <span style="margin-left: 10px">{{ scope.row.project }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('c_accounting_view.paper')" width="140rem">
            <template slot-scope="scope">
              <el-input v-model="input" :placeholder="$t('xx-00000000')" class="accounting" />
              <span style="margin-left: 10px">{{ scope.row.paper }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('c_accounting_view.money')" width="120rem">
            <template slot-scope="scope">
              <el-input v-model="input" :placeholder="$t('c_accounting_view.amount')" class="accounting" />
              <span style="margin-left: 10px">{{ scope.row.money }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('c_accounting_view.other')" width="200rem">
            <template slot-scope="scope">
              <el-input v-model="input" :placeholder="$t('c_accounting_view.other2')" class="accounting" />
              <span style="margin-left: 10px">{{ scope.row.remarks }}</span>
            </template>
          </el-table-column>
          <el-table-column label="" right="fixed">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" circle />
            </template>
          </el-table-column>
        </el-table>

      </el-main>
      <el-footer>
        <div class="accounting_btn">
          <el-tooltip :content="$t('c_accounting_view.data')" class="item" effect="dark" placement="top">
            <el-button type="primary" icon="el-icon-plus" circle />
          </el-tooltip>
          <el-tooltip :content="$t('c_accounting_view.send')" class="item" effect="dark" placement="top">
            <el-button icon="el-icon-arrow-right" circle />
          </el-tooltip>
        </div>
      </el-footer>
    </el-container>

  </div>

</template>
<script>
export default {
  data() {
    return {
      options: [{
        value: 'zhinan',
        label: '收入',
        children: [{
          value: 'shejiyuanze',
          label: '食品酒水',
          children: [{
            value: 'yizhi',
            label: '飲料'
          }, {
            value: 'fankui',
            label: '酒'
          }, {
            value: 'xiaolv',
            label: '早餐'
          }, {
            value: 'kekong',
            label: '零食'
          }]
        }, {
          value: 'daohang',
          label: '行車交通',
          children: [{
            value: 'cexiangdaohang',
            label: '公車'
          }, {
            value: 'dingbudaohang',
            label: '摩托車'
          }]
        }]
      }, {
        value: 'zujian',
        label: '支出',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '其他',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      value: '',
      options1: [{
        value: '选项1',
        label: '現金'
      }, {
        value: '选项2',
        label: '信用卡'
      }, {
        value: '选项3',
        label: '悠遊卡'
      }, {
        value: '选项4',
        label: '一卡通'
      }, {
        value: '选项5',
        label: '分類5'
      }],
      value2: '',
      options2: [{
        value: '选项1',
        label: '無專案'
      }, {
        value: '选项2',
        label: '出差'
      }, {
        value: '选项3',
        label: '家庭'
      }, {
        value: '选项4',
        label: '旅遊'
      }, {
        value: '选项5',
        label: '情侶'
      }],
      value3: '',
      formLabelAlign: {
        papertime: '',
        paper: '',
        money: '',
        other: ''
      },
      tableData: [{
        papertime: '',
        account: '',
        money: '',
        class: '',
        project: '',
        paper: '',
        remarks: ''
      }]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}

</script>

<style>
.accounting_container {
  padding-left: 0.2vw;
  padding-top: 0.5vh;
}
.accounting_btn {
  padding-left: 73.5vw;
  padding-top: 0.1vh;
}
.accounting {
  padding-top: 2.6vh;
}
</style>
