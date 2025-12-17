<template>
  <a-space direction="vertical" class="app-wrapper">
    <a-layout>
      <!-- Header：包含导航 -->
      <a-layout-header class="layout-header">
        <span>家味札记</span>
      </a-layout-header>

      <!-- Content：路由页面出口 -->
      <a-layout-content class="layout-content">
        <RouterView />
      </a-layout-content>

      <!-- Footer -->
      <a-layout-footer class="layout-footer">
        <nav class="nav-menu">
          <RouterLink to="/">
            <BankOutlined />
            <div>首页</div>
          </RouterLink>
          <RouterLink to="/recipes">
            <FileSearchOutlined />
              <div>菜谱</div>
          </RouterLink>
          <RouterLink to="/family">
            <CloudOutlined />
            <div>家庭</div>
          </RouterLink>
        </nav>
        <pop />
      </a-layout-footer>
    </a-layout>
  </a-space>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import pop from '@/views/pop.vue'



</script>


<style scoped>
/* 外层 wrapper：占满宽度 */
.app-wrapper {
  width: 100%;
}

/* Header 样式 */
.layout-header {
  background: rgb(251, 201, 140);
  color: #786d51;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 导航菜单 */
.nav-menu {
  display: flex;
  gap: 30px;
  justify-content: space-between;
}

.nav-menu a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-menu a:hover {
  color: #17e8ff; /* Antd 主题色 */
}

/* Content 样式 */
.layout-content {
  min-height: calc(100vh - 128px); /* 视口高度 - header 和 footer 高度 */
  padding: 24px;
  background-color: #fff;
}

/* Footer 样式 */
.layout-footer {
  background: #f0ca5f;
  text-align: center;
  padding: 12px 24px;
  color: #999;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}

</style>