<template>
  <div class="app-container">

    <title>
      {{ $t('route.a_promotion') }}
    </title>

    <div class="promotion_table">
      <el-table
        :data="b_promotion"
        :default-sort="{prop: 'status', order: 'acscending'}"
        stripe
        style="width: 100%;"
        max-height="600"
        fit
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form
              label-position="left"
              inline
              class="table_expand"
            >
              <el-form-item label="內容">
                <span>{{ scope.row.content }}</span>
              </el-form-item>
              <el-form-item label="商品照片">
                <img
                  :src="scope.row.photo "
                  class="promotion_img"
                >
              </el-form-item>
              <el-form-item
                label="活動連結"
                style="color:rgba(0,0,255,0.7);"
              >
                <a
                  :href="scope.row.link"
                  target="_blank"
                >
                  <span>{{ scope.row.link }}</span>
                </a>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          align="center"
        />
        <el-table-column
          label="名稱"
          prop="name"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="狀態"
          prop="status"
          align="center"
          sortable
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status==='已審核'?'primary':'danger'">
              <span>{{ scope.row.status }}</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="起日"
          prop="starttime"
          align="center"
          sortable
        >
          <template slot-scope="scope">
            <span>{{ scope.row.starttime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="迄日"
          prop="endtime"
          align="center"
          sortable
        >
          <template slot-scope="scope">
            <span>{{ scope.row.endtime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="審核"
          align="center"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.status==='已審核'">
              <el-tag type="success">
                <span>已審核過件</span>
              </el-tag>
            </div>
            <div v-else>
              <el-button
                type="warning"
                plain
                @click="check_promotion(scope.$index,scope.row)"
              >審核</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getentinfomations } from '@/api/infomations/getinfomations';
import { patchinfomations } from '@/api/infomations/patchinfomations';
import { getToken } from '@/utils/auth';
export default {
  data() {
    return {
      b_promotion: []
    }
  },
  created() {
    this.get_all_promotion()
  },
  methods: {
    get_all_promotion() {
      getentinfomations(getToken()).then(res => {
        this.b_promotion = res.data
        this.b_promotion.forEach(items => {
          if (items.status === 1) {
            items.status = '已審核';
          } else {
            items.status = '未審核';
          }
        })
      })
    },
    check_promotion(index, row) {
      this.$confirm('是否審核該優惠資訊', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        patchinfomations(getToken(), row.id)
          .then(() => {
            setTimeout(() => {
              this.b_promotion = []
              this.get_all_promotion()
            }, 500)
          })
          .catch(() => {
            console.log('error')
            return false
          })
      })
    }
  }
}
</script>

<style lang="scss">
.table_expand {
  font-size: 0;
}
.table_expand label {
  width: 90px;
  color: #99a9bf;
}
.table_expand img {
  width: 100px;
  //width: 100px;
}
.table_expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
