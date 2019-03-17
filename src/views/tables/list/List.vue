<template>
  <div class="collection">
    <el-dialog title="新建商品" :visible.sync="dialogFormVisible">
      <el-form :model="newForm">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="newForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="newForm.region" placeholder="请选择商品类型">
            <el-option label="111" value="MySQL"></el-option>
            <el-option label="Oracle" value="Oracle"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="newForm.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="newForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="newForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="newForm.describe" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">测试连接</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <div class="table-box">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          align="center">
        </el-table-column>
        <el-table-column
          prop="dataName"
          label="商品"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人"
          width=""
          align="center">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width=""
          align="center">
        </el-table-column>
        <el-table-column
          prop="changeTime"
          label="修改时间"
          width=""
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="300"
          align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleDelete">删除</el-button>
            <el-button type="primary" size="small" @click="handleEdit">编辑</el-button>
            <el-button type="success" size="small" @click="handleOperate(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Collection',
  data () {
    return {
      tableData: [{
        dataName: '商品1',
        creator: 'Admin',
        createTime: '2019-03-01 12:33:10',
        changeTime: '2019-03-02 15:00:06',
      }, {
        dataName: '商品2',
        creator: 'Admin',
        createTime: '2019-02-03 13:35:09',
        changeTime: '2019-02-14 11:06:11',
      }, {
        dataName: '商品3',
        creator: 'Admin',
        createTime: '2019-01-11 10:33:55',
        changeTime: '2019-02-02 12:00:03',
      }, {
        dataName: '商品4',
        creator: 'Admin',
        createTime: '2019-01-01 22:55:44',
        changeTime: '2019-01-02 15:00:06',
      }, {
        dataName: '商品5',
        creator: 'Admin',
        createTime: '2018-11-16 11:33:14',
        changeTime: '2018-12-02 15:55:06',
      }, {
        dataName: '商品6',
        creator: 'Admin',
        createTime: '2018-10-21 11:33:32',
        changeTime: '2018-12-09 11:15:26',
      }, {
        dataName: '商品7',
        creator: 'Admin',
        createTime: '2018-08-26 16:22:25',
        changeTime: '2018-12-02 15:44:23',
      }, {
        dataName: '商品8',
        creator: 'Admin',
        createTime: '2018-08-23 10:43:10',
        changeTime: '2018-09-22 17:25:25',
      }, {
        dataName: '商品9',
        creator: 'Admin',
        createTime: '2018-07-17 11:33:35',
        changeTime: '2018-11-02 15:55:23',
      }, {
        dataName: '商品10',
        creator: 'Admin',
        createTime: '2018-05-19 11:34:35',
        changeTime: '2018-09-04 18:31:21',
      }],
      dialogFormVisible: false,
      newForm: {
          name: '',
          origin: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleOperate (ele) {
      console.log(ele)
      this.$router.push({
        path: '/tables/details'
      })
    },
    handleDelete () {
      this.$notify({
        title: '警告',
        message: '不能删除',
        duration: 2000,
        type: 'error'
      })
    },
    handleEdit () {
      this.$message({
        showClose: true,
        message: '没有编辑权限',
        duration: 2000,
        type: 'error'
      })
    }
  }
}
</script>

<style lang="stylus">
  .collection
    // max-width 1100px
    margin 40px auto
    .new
      width 100%
      margin-bottom 20px
      height 40px
      background #fff
      display flex
      align-items center
      justify-content center
      cursor pointer
      i
        color #03A9F4
        padding-right 10px
    .page
      height 40px
      margin-top 20px
      display flex
      align-items center
      justify-content flex-end
      .el-pagination
        background #fff

</style>
