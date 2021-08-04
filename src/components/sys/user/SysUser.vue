<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="serach.name" placeholder="名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchUser">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dialogFormVisible = true"
          >新增</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-popconfirm title="确定要删除吗？" @confirm="deleteRow(null)">
          <el-button type="danger" :disabled="deleteBtn" slot="reference"
            >批量删除</el-button
          >
        </el-popconfirm>
      </el-form-item>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="pageData.tableData"
      @selection-change="selectChange"
      tooltip-effect="dark"
      style="width: 100%"
      max-height="70%"
      border
      highlight-current-row
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="编码" width="120"> </el-table-column>
      <el-table-column prop="roleName" label="名称" width="120">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="eidtUserOpen(scope.row)"
            type="text"
            size="small"
          >
            编辑
          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.row.id)"
            type="text"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageData.currentPage"
      :page-sizes="[1, 10, 50, 100, 300]"
      :page-size="pageData.pageSize"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageData.total"
    >
    </el-pagination>
    <!-- 新增弹出框-->
    <el-dialog
      title="新增用户"
      @close="userClose"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户序号" v-show="false">
          <el-input v-model="userForm.id"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="userForm.userName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SysUser",
  data(){
    return {
      serach:{name:""},
      dialogFormVisible:false,
      deleteBtn:true,
      pageData:{
        tableData:[{}],
        currentPage:1,
        pageSize:10,
        total:0
      },
      userForm:{
        id:'',
        userName:''
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      }
    }
  },
  methods: {
    searchUser(){
      this.$message({ message: "操作成功", type: "success" });
    },
    deleteRow(){
      this.$message({ message: "删除成功", type: "success" });
    },
    selectChange(){
      this.$message({ message: "选择成功", type: "success" });

    },
    eidtUserOpen(){
            this.$message({ message: "打开弹出框", type: "success" });
    },
    handleSizeChange(val){

    },
    handleCurrentChange(val){

    },
    userClose(){

    },
    editUser(){
      
    },
    getUsers(curPage,pageSize){
      const _this = this;
      this.$axios.get("/sys/user/getUsers", {params:{curPage:curPage,pageSize:pageSize}})
        .then(function (response) {
          console.log("获取用户：", response);
          _this.pageData = response.data.data;
        })
        .catch(function (error) {
          console.log("获取用户错误：", error);
        });
    }
  },
};
</script>

<style scope>
.el-main {
  text-align: initial;
  line-height: 0%;
}
</style>