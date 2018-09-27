<template>
  <el-table :data="tableData" border style="width: 50%">
    <el-table-column prop="category1" label="分類" width="180" />
    <el-table-column prop="category2" label="子分類" />
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">新增</el-button>
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  data() {
    return {
      tableData: [{
        category1: '食品酒水',
        category2: '午餐'
      }]
    }
  }
}

</script>

