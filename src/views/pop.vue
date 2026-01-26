<template>
  <div class="fixed right-3 bottom-1 z-50">
    <!-- 下拉菜单 -->
    <a-dropdown placement="topRight" :overlayStyle="{ marginBottom: '8px' }" :trigger="['click']">
      <a class="ant-dropdown-link" @click.prevent>
        <PlusCircleOutlined class="addIcon" />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <p @click="showCaipuModal">发布菜谱</p>
          </a-menu-item>
          <a-menu-item>
            <p @click="showDongtaiModal">发布家庭动态</p>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <!-- 菜谱弹窗 -->
    <a-modal
      v-model:open="showCaipu"
      title="发布菜谱"
      width="800px"
      @ok="handleCaipuOk"
      @cancel="handleCancel"
    >
      <chuangjiancaipu ref="caipuForm" />
    </a-modal>

    <!-- 动态弹窗 -->
    <a-modal
      v-model:open="showDongtai"
      title="发布家庭动态"
      width="600px"
      @ok="handleDongtaiOk"
      @cancel="handleCancel"
    >
      <fabujiatingdongtai ref="dongtaiForm" />
    </a-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import chuangjiancaipu from '@/components/chuangjiancaipu.vue'
import fabujiatingdongtai from '@/components/fabujiatingdongtai.vue'
import { postRecipe } from '@/api/recipe'

// 弹窗显示状态
const showCaipu = ref(false)
const showDongtai = ref(false)

// 表单引用
const caipuForm = ref(null)
const dongtaiForm = ref(null)

// 显示菜谱弹窗
const showCaipuModal = () => {
  showCaipu.value = true
}

// 显示动态弹窗
const showDongtaiModal = () => {
  showDongtai.value = true
}

// 处理菜谱提交
const handleCaipuOk = async () => {
  const formApi = caipuForm.value
  if (!formApi || typeof formApi.getValue !== 'function') {
    message.error('表单不可用')
    return
  }

  const payload = formApi.getValue()
  const { ...data } = payload || {}

  try {
    await postRecipe(data)
    message.success('菜谱发布成功')
    showCaipu.value = false
  } catch (e) {
    console.error(e)
    message.error('菜谱发布失败')
  }
}

// 处理动态提交
const handleDongtaiOk = async () => {
  if (dongtaiForm.value) {
    const isValid = await dongtaiForm.value.validate()
    if (isValid) {
      message.success('动态发布成功')
      showDongtai.value = false
    }
  }
}

// 取消
const handleCancel = () => {
  showCaipu.value = false
  showDongtai.value = false
}
</script>

<style scoped>
.addIcon {
  font-size: 40px;
  margin-left: 10px;
  color: #fcfdf7;
  cursor: pointer;
}
</style>
