<template>
  <div class="setting">
    <h1 class="title">setting</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <br />
    <br />
    <h4 style="font-size: 20px;">微信小程序扫码体验</h4>
    <div style="padding: 20px; text-align: center">
      <img src="@/assets/logo.png" alt height="150px" />
      <img src="@/assets/lajifenlei.png" alt height="150px" />
    </div>
  </div>
</template>

<script>
import axios from "../../axios.js";
export default {
  name: "Setting",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    // this.getAllUser()
  },
  methods: {
    getAllUser() {
      axios.getAllUser().then(res => {
        console.log(res);
        if (res.status === 200 && res.data && res.data.code === 0) {
          this.tableData = res.data.result;
        } else {
          this.$notify({
            title: "错误",
            message: res.data.msg,
            duration: 2000,
            type: "error"
          });
        }
      });
    },
    handleClick(e) {
      console.log(e.username);
      axios
        .delUser({
          username: e.username
        })
        .then(res => {
          if (res.status === 200 && res.data && res.data.code === 0) {
            this.$notify({
              title: "成功",
              message: res.data.msg,
              duration: 2000,
              type: "error"
            });
            this.tableData = this.tableData.filter(
              val => val.username !== e.username
            );
          } else {
            this.$notify({
              title: "错误",
              message: res.data.msg,
              duration: 2000,
              type: "error"
            });
          }
        });
    }
  }
};
</script>

<style lang="stylus">
.setting {
  background: #fff;
  padding: 20px;
  max-width: 1100px;
  margin: 0 auto;

  .title {
    font-size: 28px;
    padding: 0 0 30px 0;
  }
}
</style>