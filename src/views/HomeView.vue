<template>
  <div>
    <div>
      <a-input-search placeholder="搜索菜谱..." class="w-[270px]" @search="onSearch" />
    </div>

    <!-- 信息提醒 -->
    <div class="flex justify-center p-2">
      <a-alert
        :message="healthText || '服务运行正常'"
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
          v-for="item in recipeList"
          :key="item.id"
          :title="item.title"
          :cover="item.coverImage"
          :author="item.author.nickname"
          :authorAvatar="item.author.avatar"
          :like_count="item.likeCount"
          @view="goDetail(item.id)"
          @favorite="toggleFavorite(item.id)"
        />
      </span>
    </section>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'

import { ref, onMounted } from 'vue'
import { FireOutlined } from '@ant-design/icons-vue'
import { getHealth, getRecipeList, type Recipe } from '@/api/recipe'
import RecipeCard from '../components/RecipeCard.vue'
import DishCarousel from '../components/DishCarousel.vue'

// 顶部健康检查提示
const healthText = ref<string>('')

// 轮播组件需要 { id, title, coverImage }
const popularHomeCookedDishes = ref<Array<Recipe>>([])

const recipeList = ref<Array<Recipe>>([])

onMounted(async () => {
  // 健康检查
  try {
    const health = await getHealth()
    healthText.value = health
  } catch (e) {
    console.error(e)
    // 静默失败，提示由全局拦截器处理
  }
  try {
    const res = await getRecipeList()
    popularHomeCookedDishes.value = res
    recipeList.value = res
  } catch (e) {
    console.error(e)
    // 静默失败，提示由全局拦截器处理
  }
})

function onSearch(value: string) {
  console.log('搜索内容：', value)
}
function goDetail(id: number) {
  console.log('查看详情', id)
  // 跳转
  router.push(`/recipes/${id}`)
}

function toggleFavorite(id: number) {
  console.log('收藏', id)
}
</script>

<style scoped></style>
