<template>
  <div class="p-4 space-y-4">
    <a-breadcrumb>
      <a-breadcrumb-item @click="goHome" class="cursor-pointer">首页</a-breadcrumb-item>
      <a-breadcrumb-item>菜谱详情</a-breadcrumb-item>
    </a-breadcrumb>

    <a-card v-if="loading" title="加载中" :bordered="false">正在获取菜谱详情...</a-card>

    <a-card v-else-if="recipe" :title="recipe.title" :bordered="false">
      <div class="flex gap-4">
        <img :src="recipe.coverImage" alt="封面" class="w-48 h-32 object-cover rounded" />
        <div class="space-y-2">
          <p class="text-gray-600">{{ recipe.intro }}</p>
          <p class="text-sm text-gray-500">烹饪时间：{{ recipe.cookingTime }}</p>
          <p class="text-sm text-gray-500">作者：{{ recipe.author.nickname }}</p>
          <p class="text-sm text-gray-500">
            点赞：{{ recipe.likeCount }} · 收藏：{{ recipe.collectCount }}
          </p>
        </div>
      </div>

      <a-divider />

      <h3 class="text-lg font-semibold">食材</h3>
      <ul class="list-disc list-inside space-y-1">
        <li v-for="item in recipe.ingredients" :key="item.name">
          {{ item.name }} - {{ item.quantity }}
        </li>
      </ul>

      <a-divider />

      <h3 class="text-lg font-semibold">步骤</h3>
      <div v-for="step in recipe.steps" :key="step.step">
        <div class="font-medium">步骤 {{ step.step }}</div>
        <div class="text-gray-700">{{ step.description }}</div>
      </div>
    </a-card>

    <a-result v-else status="404" title="未找到该菜谱" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getRecipeById, type Recipe } from '@/api/recipe'

const route = useRoute()
const router = useRouter()

const recipe = ref<Recipe | null>(null)
const loading = ref<boolean>(false)

const fetchRecipe = async () => {
  const idParam = route.params.id as string
  const id = Number(idParam)
  if (Number.isNaN(id)) return

  loading.value = true
  try {
    const data = await getRecipeById(id)
    console.log(12312, data)
    recipe.value = data
  } finally {
    loading.value = false
  }
}

const goHome = () => {
  router.push('/')
}

onMounted(fetchRecipe)
</script>
