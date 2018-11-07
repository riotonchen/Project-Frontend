<template>
  <div class="cheap">
    <title>
      {{ $t('route.b_activity_add') }}
    </title>

    <el-card class="box_card">

      <div class="table_container">
        <el-form :label-position="labelPosition" :model="b_activity_add" :rules="activity_add_rules" label-width="140px" inline class="table_activity_add">

          <el-form-item :label="$t('b_activity_add.commodityname')" prop="name">
            <el-input v-model="b_activity_add.name" class="activity_table" />
          </el-form-item>

          <el-form-item :label="$t('b_activity_add.content')" prop="content">
            <el-input v-model="b_activity_add.content" :autosize="{ minRows: 3, maxRows:1}" type="textarea" style="width: 15vw" class="activity_table" />
          </el-form-item>

          <el-form-item :label="$t('b_activity_add.timestart')">
            <el-date-picker v-model="b_activity_add.addedtime" :placeholder="$t('b_activity_add.date')" type="date" style="width:15vw;min-width:7.5rem;max-width:15rem;" />
          </el-form-item>

          <el-form-item :label="$t('b_activity_add.timestop')">
            <el-date-picker v-model="b_activity_add.dismountedtime" :placeholder="$t('b_activity_add.date')" type="date" style="width:15vw;min-width:7.5rem;max-width:15rem;" />
          </el-form-item>

        </el-form>
      </div>
      <div class="upload">
        <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
          <i class="el-icon-upload" />
          <div class="el-upload__text">{{ $t('b_activity_add.picturetext') }}<em>{{ $t('b_activity_add.text') }}</em></div>
          <div slot="tip" class="el-upload__tip">{{ $t('b_activity_add.remark') }}</div>
        </el-upload>
      </div>
      <div class="cheap_btn">
        <el-button type="primary " @click="send_data()">{{ $t('b_activity_add.add') }}</el-button>
      </div>
    </el-card>

  </div>
</template>
<script>
export default {
  data() {
    const validatename = (rule, value, callback) => {
      if (value === '' || value === null) {
        return callback(new Error('名稱不能為空'))
      } else if (value.length > 10) {
        callback(new Error('名稱不可以大於 10 個字'))
      } else {
        callback()
      }
    }
    const validatecontent = (rule, value, callback) => {
      if (value === '' || value === null) {
        return callback(new Error('內容不能為空'))
      } else if (value.length > 50) {
        callback(new Error('內容不可以大於 50 個字'))
      } else {
        callback()
      }
    }
    return {
      labelPosition: 'right',
      b_activity_add: {
        name: '',
        content: '',
        addedtime: '',
        dismountedtime: ''
      },
      activity_add_rules: {
        name: [{ required: false, trigger: 'change', validator: validatename }],
        content: [{ required: false, trigger: 'change', validator: validatecontent }]
      }
    }
  },
  methods: {
    send_data() {
      // nhbjhb
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
.cheap_btn {
  float: right;
  margin-right: 5%;
  margin-top: 2%;
}
.box_card {
  width: 80%;
  padding-bottom: 5%;
  margin: 12vh 10vw;
  position: relative;
}
.upload {
  position: absolute;
  margin-top: -25%;
  margin-left: 50%;
}
.table_activity_add {
  font-size: 0;
  padding-top: 5%;
}
.table_activity_add label {
  width: 90px;
  color: #99a9bf;
  font-size: 0.8vw;
}
.table_activity_add input {
  font-family: "Microsoft JhengHei";
  width: 130%;
}
.table_activity_add textarea {
  font-family: "Microsoft JhengHei";
  width: 130%;
  padding-top: 0.65rem;
}
.table_activity_add .el-form-item {
  margin-right: 0;
  //margin-bottom: 0;
  width: 100%;
}
</style>

