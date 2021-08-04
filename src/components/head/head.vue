<template>
  <div>
    <strong>后台商城管理系统</strong>
    <div class="header-avater">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{$store.getters.username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="info">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-link href="#" target="_blank">默认链接</el-link>
      <el-link href="#" target="_blank">默认链接</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {
    }
  },
  methods: {
    handleCommand(command){
        const _this = this;
        if(command==="logout"){
          
          this.$axios.post('/sys/logout',{})
        .then(function (response) {
          console.log("退出成功：",response)
          _this.$router.push('/login');
        })
        .catch(function (error) {
          console.log("退出错误：",error)
        });
        }
    }
  },
  created(){
  },
  mounted() {
    
  },
  computed: {
  },
};
</script>

<style>
</style>