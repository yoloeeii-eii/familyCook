<template>
  <a-card hoverable class="w-[365px] h-[144px] rounded-xl shadow-sm p-0 overflow-hidden">
    <div class="flex gap-4">
      <!-- 左：图片 -->
      <div class="w-[96px] h-[96px] rounded-lg overflow-hidden bg-gray-100 shrink-0">
        <img :src="cover" class="w-full h-full object-cover" />
      </div>

      <!-- 右：信息 -->
      <div class="flex-1 flex flex-col justify-between">
        <h3 class="text-gray-800 text-lg pt-2">
          {{ title }}
        </h3>

        <!-- 底部信息行 -->
        <div class="flex justify-between items-center pb-4">
          <!-- 作者 -->
          <div class="flex items-center text-xs text-gray-500 gap-1">
            <a-avatar :src="authorAvatar" :size="24" />
            <span class="truncate">{{ author }}</span>
            <span class="text-gray-300">·</span>
            <span class="text-orange-500 shrink-0">{{ likes }} 赞</span>
          </div>

          <!-- 操作 -->
          <div class="flex items-center gap-2">
            <a-button size="small" @click="$emit('view')">查看做法</a-button>
            <a-button size="small" shape="circle" @click="$emit('favorite')">🤍</a-button>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  cover: string
  author: string
  authorAvatar: string
  likes: number
}>()

defineEmits<{
  (e: 'view'): void
  (e: 'favorite'): void
}>()
</script>
