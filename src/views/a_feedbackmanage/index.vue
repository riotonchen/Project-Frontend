<template>
  <div class="app-container">

    <title>
      {{ $t('route.A_feeback_manage') }}
    </title>
    <div class="filter-container">
      <el-select v-model="testselect" clearable filterable style="width: 25vw;max-width:7.5rem;min-width:5.5rem;" @focus="get_cardlist()" @change="get_cardlist()">
        <el-option v-for="item in testdata" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </div>
    <div class="feedback_table">
      <el-table :data="test" stripe style="width: 100%;" max-height="500" fit sortable>
        <el-table-column type="index" align="center" />
        <el-table-column label="問題主旨" prop="title">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="問題內容" prop="context">
          <template slot-scope="scope">
            <span>{{ scope.row.context }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" plain @click.native.prevent="handle_edit(scope.$index,scope.row)">{{ $t('c_card_view.edit') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
import waves from '@/directive/waves'

export default {
  name: 'AFeedbackmanage',
  directives: {
    waves
  },

  data() {
    return {
      test: [{ title: 'hufihsiogrkj', context: '12348465' }, { title: 'fdiushfiusdiufhi', context: '156161' }],
      testselect: '',
      testdata: [{ id: 1, name: '可' }, { id: 2, name: '阿' }, { id: 3, name: '溪' }]
    }
  },
  created() {
  },

  methods: {
  }
}
</script>
