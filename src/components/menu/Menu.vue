<template>
  <div style="width: 200px">
    <el-menu
      :default-active="this.$store.state.menus.editableTabsValue"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item
        @click="selectMenu({ component: 'Home', menuName: '首页' })"
      >
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>首页</span>
        </template>
      </el-menu-item>

      <el-submenu
        :index="String(menu.menuName)"
        v-for="menu in menus"
        :key="menu.id"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ menu.menuName }}</span>
        </template>

        <router-link
          :to="item.menuPath"
          v-for="item in menu.childMenu"
          :key="item.id"
        >
          <el-menu-item
            :index="String(item.component)"
            @click="selectMenu(item)"
          >
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span slot="title">{{ item.menuName }}</span>
            </template>
          </el-menu-item>
        </router-link>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {};
  },
  methods: {
    selectMenu(item) {
      this.$store.commit("addTab", item);
    },
  },
  created() {},
  computed: {
    menus: {
      get() {
        return this.$store.state.menus.menuList;
      },
    },
  },
  mounted() {},
};
</script>

<style scope>
.header-avater {
  float: right;
  width: 310px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.el-container {
  padding: 0;
  margin: 0;
  height: 100vh;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-menu-vertical-demo {
  height: 100%;
}
</style>