<template>
  <a-carousel arrows :slides-to-show="2" :slides-to-scroll="1" autoplay :autoplay-speed="3000">
    <div v-for="dish in dishes" :key="dish.id" class="px-2">
      <a-card
        hoverable
        class="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
        :body-style="{ padding: '0' }"
      >
        <div class="relative h-[180px] group cursor-pointer">
          <img
            :src="dish.picture"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            class="absolute w-[164px] h-[50px] bottom-4 left-0 right-0 bg-black/40 text-white text-sm p-8"
          >
            {{ dish.title }}
          </div>
        </div>
      </a-card>
    </div>
  </a-carousel>
</template>

<script setup lang="ts">
interface Dish {
  id: number
  title: string
  picture: string
}

defineProps<{
  dishes: Dish[]
}>()
</script>
