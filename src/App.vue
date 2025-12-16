<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/recipes">菜谱夹</RouterLink>
        <RouterLink to="/family">家庭</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
</style>
