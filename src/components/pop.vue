<template>
    <PlusCircleOutlined class="addIcon" @click="handleAddClick" />
</template>

<script setup lang="ts">

function handleAddClick() {
  console.log('Add icon clicked');
}

</script>

<style scoped>
    
.addIcon {
  font-size: 50px; 
  color: #FFF; 
  padding: 0 12px;
}
</style>