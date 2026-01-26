<template>
  <div>
    <div>
      <a-input-search placeholder="搜索菜谱..." class="w-[270px]" @search="onSearch" />
    </div>

    <!-- 信息提醒 -->
    <div class="flex justify-center p-2">
      <a-alert
        message="妈妈更新了「糖醋排骨」"
        type="info"
        banner
        show-icon
        closable
        class="rounded-3xl w-[370px] h-[40px] m-2 flex items-center justify-center"
      >
        <template #icon>
          <FireOutlined style="color: rgb(249, 115, 22)" />
        </template>
      </a-alert>
    </div>

    <!-- 热门家常菜 -->
    <section>
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-xl font-semibold text-gray-800">热门家常菜</h2>
        <a-button type="link" class="text-orange-500">查看更多</a-button>
      </div>

      <DishCarousel :dishes="popularHomeCookedDishes" />
    </section>

    <!-- 最新上传 -->
    <section>
      <div class="flex items-center justify-between pt-3">
        <h2 class="text-xl font-semibold text-gray-800">最新上传</h2>
        <a-button type="link" class="text-orange-500">查看更多</a-button>
      </div>
      <span class="gap-2 flex flex-wrap">
        <RecipeCard
          v-for="item in recentlyUploaded"
          :key="item.id"
          :title="item.title"
          :cover="item.cookPicture"
          :author="item.username"
          :authorAvatar="item.profilePicture"
          :likes="item.likes"
          @view="goDetail(item.id)"
          @favorite="toggleFavorite(item.id)"
        />
      </span>
    </section>
  </div>
</template>

<script setup lang="ts">
import { mockPopularHomeCookedDishes, mockRecentlyUploaded } from '../mockData/homeView'
import RecipeCard from '../components/RecipeCard.vue'
import DishCarousel from '../components/DishCarousel.vue'
const popularHomeCookedDishes = mockPopularHomeCookedDishes
const recentlyUploaded = mockRecentlyUploaded

function onSearch(value: string) {
  console.log('搜索内容：', value)
}
function goDetail(id: number) {
  console.log('去详情页', id)
}

function toggleFavorite(id: number) {
  console.log('收藏', id)
}
</script>

<style scoped></style>
