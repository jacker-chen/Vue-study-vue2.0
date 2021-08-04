<template>
  <el-container>
    <el-header>
      <Head></Head>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Menu></Menu>
      </el-aside>
      <el-main>
        <Tabs></Tabs>
        <Main></Main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "./menu/Menu.vue";
import Head from "./head/head.vue";
import Main from "./main/Main.vue";
import Tabs from "./main/Tabs.vue"

export default {
  components: { Menu, Head, Main,Tabs },
  name: "Index",
  data() {
    return {
    }
  },
  mounted() {
    let hash = this.$store.state.menus.editableTabs.length;
		if(hash <= 1){
			this.$router.push("/home")
		}
  },
  computed: {
   
  },
};
</script>
<style scoped>
</style>