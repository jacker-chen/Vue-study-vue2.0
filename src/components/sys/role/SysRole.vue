<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input
          v-model="searFrom.name"
          placeholder="名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchRoles">搜索</el-button>
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
            @click.native.prevent="eidtRoleOpen(scope.row)"
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
      title="新增角色"
      @close="roleClose"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="roleForm"
        :rules="rules"
        ref="roleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色序号" v-show="false">
          <el-input v-model="roleForm.id"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SysRole",
  data() {
    return {
      searFrom: {
        name: "",
      },
      deleteBtn: true,
      selectIds:[],
      pageData:{
        tableData: [{}],
        currentPage: 1,
        pageSize:10,
        total:0
      },

      dialogTableVisible: false,
      dialogFormVisible: false,
      roleForm: {
        roleName: "",
        id: "",
      },
      formLabelWidth: "120px",
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
  },
  methods: {
    selectChange(selections){
      this.selectIds = []
      selections.forEach((item) => {
        this.selectIds.push(item.id)
    })
      this.deleteBtn = selections.length >0?false:true
      console.log(this.selectIds)
    },
    handleSizeChange(val) {
      this.getRoles(this.pageData.currentPage,val)
    },
    handleCurrentChange(val) {
      this.getRoles(val,this.pageData.pageSize)
    },
    roleClose() {
      this.roleForm.id = "";
      this.roleForm.roleName = "";
    },
    deleteRow(id) {
      console.log(id);
      const _this = this;
      var ids = [];
      if (id == null) {
        ids = this.selectIds
      } else {
        ids.push(id);
      }
      this.$axios
        .delete("/sys/role/del", {
          params: {
            ids: ids,
          },
          paramsSerializer: (params) => {
            return _this.$qs.stringify(params, { indices: false });
          },
        })
        .then(function (response) {
          const count = response.data.data;
          let msg = "";
          if (count > 0) {
            msg = "删除角色成功";
          } else {
            msg = "该角色已删除，无需重复删除";
          }
          _this.$message({ message: msg, type: "success" });
          _this.getRoles(_this.pageData.currentPage,_this.pageData.pageSize);
        })
        .catch(function (error) {
          _this.$message.error("删除角色失败！");
          console.log(error);
        });
    },
    getRoles(curPage,pageSize) {
      const _this = this;
      this.$axios.get("/sys/role/getRoles", {params:{curPage:curPage,pageSize:pageSize}})
        .then(function (response) {
          console.log("获取角色：", response);
          _this.pageData = response.data.data;
        })
        .catch(function (error) {
          console.log("获取角色错误：", error);
        });
    },
    searchRoles() {
      const _this = this;
      let url = "/sys/role/"
      if(this.searFrom.name === ""){
        url+="getRoles"
      }else{
        url+="search/"+this.searFrom.name
      }
      this.$axios.get(url, {params:{curPage:this.pageData.currentPage,pageSize:this.pageData.pageSize}})
        .then(function (response) {
          console.log("获取角色：", response);
          _this.pageData = response.data.data;
        })
        .catch(function (error) {
          console.log("获取角色错误：", error);
        });
    },
    eidtRoleOpen(rowData) {
      this.roleForm.id = rowData.id;
      this.roleForm.roleName = rowData.roleName;
      this.dialogFormVisible = true;
    },
    editRole() {
      var operate = "add";
      if (this.roleForm.id) {
        operate = "edit";
      }

      const _this = this;
      this.$refs["roleForm"].validate((valid) => {
        if (valid) {
          this.$axios
            .put("/sys/role/" + operate, {
              id: this.roleForm.id,
              roleName: this.roleForm.roleName,
            })
            .then(function (response) {
              const flag = response.data.data;
              console.log(flag);
              if (flag == 0) {
                _this.$message.error("操作失败，已在在该角色名称");
                return;
              } else {
                _this.$message({ message: "操作成功", type: "success" });
                _this.dialogFormVisible = false;
                _this.roleForm.roleName = "";
                _this.roleForm.id = "";
                _this.getRoles(_this.pageData.currentPage,_this.pageData.pageSize);
              }
            })
            .catch(function (error) {
              _this.$message.error("新增角色失败，" + error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    this.getRoles(1,10);
  },
};
</script>

<style scope>
.h3 {
  margin: 10px;
}
.el-main {
  text-align: initial;
  line-height: 0%;
}
.el-pagination {
  float: right;
  margin-top: 22px;
}
</style>