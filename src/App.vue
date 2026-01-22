<template>
  <a-space
    direction="vertical"
    class="fixed w-full h-full md:w-[400px] md:h-[900px] overflow-hidden relative mx-auto my-0"
  >
    <a-layout>
      <!-- Header：固定顶部，响应式高度 -->
      <a-layout-header
        class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full shadow-sm h-12 md:h-15"
        :style="{
          background: 'rgb(251, 201, 140)',
          color: '#786d51',
        }"
      >
        <span class="text-base md:text-lg font-medium">家味札记</span>
      </a-layout-header>

      <!-- Content：主要内容区域，响应式内边距 -->
      <a-layout-content
        class="min-h-[calc(100vh-96px)] md:min-h-[calc(100vh-120px)] px-3 md:px-4 pt-12 pb-12 md:pb-12 overflow-y-auto"
        :style="{
          background: 'linear-gradient(180deg, #fffaf0 0%, #fff5e6 100%)',
        }"
      >
        <div class="min-h-full">
          <RouterView />
        </div>
      </a-layout-content>

      <!-- Footer：固定底部，响应式高度和间距 -->
      <a-layout-footer
        class="fixed bottom-0 left-0 right-0 z-50 text-center px-4 md:px-6 py-3 text-gray-500 text-xs md:text-sm flex justify-between items-center h-12 md:h-15 w-full shadow-sm"
        :style="{
          background: '#f0ca5f',
          color: '#999',
        }"
      >
        <nav class="flex justify-between items-center flex-1 mr-4 md:mr-5 gap-4 md:gap-8">
          <RouterLink
            to="/"
            class="flex flex-col items-center font-medium transition-colors duration-300 min-w-12 md:min-w-15"
            :class="{
              'text-[#1890ff] font-bold': $route.path === '/',
              'text-white hover:text-[#17e8ff]': $route.path !== '/',
            }"
          >
            <BankOutlined class="text-sm md:text-base mb-0.5 md:mb-1" />
            <div class="text-xs md:text-xs">首页</div>
          </RouterLink>
          <RouterLink
            to="/recipes"
            class="flex flex-col items-center font-medium transition-colors duration-300 min-w-12 md:min-w-15"
            :class="{
              'text-[#1890ff] font-bold': $route.path === '/recipes',
              'text-white hover:text-[#17e8ff]': $route.path !== '/recipes',
            }"
          >
            <FileSearchOutlined class="text-sm md:text-base mb-0.5 md:mb-1" />
            <div class="text-xs md:text-xs">菜谱</div>
          </RouterLink>
          <RouterLink
            to="/family"
            class="flex flex-col items-center font-medium transition-colors duration-300 min-w-12 md:min-w-15"
            :class="{
              'text-[#1890ff] font-bold': $route.path === '/family',
              'text-white hover:text-[#17e8ff]': $route.path !== '/family',
            }"
          >
            <CloudOutlined class="text-sm md:text-base mb-0.5 md:mb-1" />
            <div class="text-xs md:text-xs">家庭</div>
          </RouterLink>
        </nav>
        <pop />
      </a-layout-footer>
    </a-layout>
  </a-space>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import pop from '@/views/pop.vue'

const $route = useRoute()
</script>

<style>
/* 需要保留的部分样式，Tailwind无法覆盖 */

/* 确保ant-design布局样式正确 */
:deep(.ant-layout) {
  background: transparent;
  margin: 0;
  padding: 0;
}

:deep(.ant-layout-header) {
  padding: 0;
  height: auto;
  line-height: normal;
  background: transparent !important;
}

:deep(.ant-layout-content) {
  margin: 0;
  padding: 0;
  background: transparent !important;
}

:deep(.ant-layout-footer) {
  padding: 0;
  height: auto;
  background: transparent !important;
}

/* 移动端优化 */
@media (max-width: 640px) {
  .nav-link {
    padding: 4px 6px;
  }

  .nav-icon {
    font-size: 16px;
  }
}
</style>
