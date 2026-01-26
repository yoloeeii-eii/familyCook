<template>
  <div class="w-full">
    <a-carousel arrows :slides-to-show="2" :slides-to-scroll="1" autoplay :autoplay-speed="3000">
      <div v-for="dish in dishes" :key="dish.id" class="px-2">
        <a-card
          hoverable
          class="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          :body-style="{ padding: '0' }"
        >
          <div class="relative h-[180px] group cursor-pointer">
            <img
              :src="dish.coverImage"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute w-[164px] h-[50px] bottom-0 left-0 right-0 bg-black/40">
              <span class="flex justify-center items-center text-white text-sm p-3">
                {{ dish.title }}
              </span>
            </div>
          </div>
        </a-card>
      </div>
    </a-carousel>
  </div>
</template>

<script setup lang="ts">
interface Dish {
  id: number
  title: string
  coverImage: string
}

defineProps<{
  dishes: Dish[]
}>()
</script>
<style lang="css" scoped>
.slick-dots slick-dots-bottom {
  bottom: 2px !important;
}
/* For demo */
:deep(.slick-slide) {
  text-align: center;
  height: 189px;
  line-height: 160px;
  background: #ffffff;

  overflow: hidden;
}

:deep(.slick-slide h3) {
  color: #fff;
}
</style>
