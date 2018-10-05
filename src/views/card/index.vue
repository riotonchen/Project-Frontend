<template>
  <div class="card1">
    <title>
      卡片管理
    </title>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="card" label="票卡" width="180">
          <template slot-scope="scope">
            <el-input v-model="input" placeholder="屈臣氏" />

            <span style="margin-left: 10px">{{ scope.row.type }}</span>
          </template>
        </el-table-column>

        <el-table-column label="" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-plus" circle />
            <el-button type="primary" icon="el-icon-edit" circle />
            <el-button type="danger" icon="el-icon-delete" circle />

          </template>

        </el-table-column>
      </el-table>
    </div>
    <div class="add">

      <el-button type="primary " @click="onSubmit ">儲存</el-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tableData: [{
        class: '',
        subclass: '',
        act: ''
      }]
    }
  }
}

</script>
<style>
.card1 {
  padding-right: 2vmax;
  padding-left: 2vmax;
  padding-top: 2vmax;
  padding-bottom: 2vmax;
}
.add {
  margin-top: 50vmin;
  margin-bottom: 50vmax;
  margin-right: 5vmin;
  margin-left: 150vmin;
  position: fixed;
}
</style>
