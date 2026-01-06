<template>
  <div class="contain">
    <!-- 搜索栏 -->
    <div class="mb-4">
      <div>
        <a-input-search placeholder="搜索菜谱..." style="width: 200px" @search="onSearch" />
      </div>
    </div>

    <!-- 信息弹窗 -->
    <div>
      <a-alert message="妈妈更新了“糖醋排骨”" type="info" show-icon>
        <template #icon><smile-outlined /></template>
      </a-alert>
    </div>

    <!-- 热门家常菜 -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-gray-800">热门家常菜</h2>
        <button class="text-orange-500 text-sm">查看更多</button>
      </div>

      <div class="grid grid-cols-3 gap-3">
        <div
          v-for="dish in popularHomeCookedDishes"
          :key="dish.id"
          class="m-3 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <!-- 固定尺寸菜品图片 -->
          <div class="w-full h-[120px] overflow-hidden gap-2">
            <img :src="dish.picture" :alt="dish.title" class="w-full h-full object-cover" />
          </div>
          <div class="p-3">
            <h3 class="font-medium text-gray-800 text-sm mb-1">{{ dish.title }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- 最新上传 -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-gray-800">最新上传</h2>
        <button class="text-orange-500 text-sm">查看更多</button>
      </div>

      <div class="space-y-3">
        <div
          v-for="item in recentlyUploaded"
          :key="item.id"
          class="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div class="flex gap-3">
            <!-- 固定尺寸菜品图片 -->
            <div class="w-[100px] h-[100px] rounded-lg bg-gray-100">
              <img :src="item.cookPicture" :alt="item.title" class="w-full h-full object-cover" />
            </div>

            <!-- 菜品信息 -->
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-gray-800 mb-2">{{ item.title }}</h3>

              <div class="flex items-center mb-3">
                <div
                  class="w-[20px] h-[20px] rounded-full overflow-hidden border border-gray-200 mr-2"
                >
                  <img
                    :src="item.profilePicture"
                    :alt="item.username"
                    class="w-full h-full object-cover"
                  />
                </div>
                <span class="text-sm text-gray-600 mr-2">{{ item.username }}</span>
                <span class="text-sm text-orange-500">· {{ item.likes }}赞</span>
                <button>查看做法</button>
                <button>🤍</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const popularHomeCookedDishes = [
  {
    id: 1,
    title: '红烧肉',
    picture:
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&h=200&fit=crop&auto=format',
  },
  {
    id: 2,
    title: '鱼香肉丝',
    picture:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=200&fit=crop&auto=format',
  },
  {
    id: 3,
    title: '家常小炒',
    picture:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop&auto=format',
  },
]

const recentlyUploaded = [
  {
    id: 1,
    cookPicture:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=300&fit=crop&auto=format',
    title: '可乐鸡翅',
    profilePicture:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&auto=format',
    username: '表哥',
    likes: 12,
  },
  {
    id: 2,
    cookPicture:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&h=300&fit=crop&auto=format',
    title: '清炒时蔬',
    profilePicture:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&auto=format',
    username: '妈妈',
    likes: 8,
  },
  {
    id: 3,
    cookPicture:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=300&fit=crop&auto=format',
    title: '番茄炒蛋',
    profilePicture:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&auto=format',
    username: '哥哥',
    likes: 15,
  },
]

function onSearch(value) {
  console.log('搜索内容：', value)
}
</script>
