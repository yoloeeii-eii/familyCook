<template>
  <div>
    <!-- 下拉菜单 -->
    <a-dropdown>
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
import { ref } from 'vue';
import chuangjiancaipu from '@/components/chuangjiancaipu.vue';
import fabujiatingdongtai from '@/components/fabujiatingdongtai.vue';

// 弹窗显示状态
const showCaipu = ref(false);
const showDongtai = ref(false);

// 表单引用
const caipuForm = ref(null);
const dongtaiForm = ref(null);

// 显示菜谱弹窗
const showCaipuModal = () => {
  showCaipu.value = true;
};

// 显示动态弹窗
const showDongtaiModal = () => {
  showDongtai.value = true;
};

// 处理菜谱提交
const handleCaipuOk = async () => {
  if (caipuForm.value) {
    const isValid = await caipuForm.value.validate(); // 假设组件有 validate 方法
    if (isValid) {
      // 提交逻辑
      message.success('菜谱发布成功');
      showCaipu.value = false;
    }
  }
};

// 处理动态提交
const handleDongtaiOk = async () => {
  if (dongtaiForm.value) {
    const isValid = await dongtaiForm.value.validate();
    if (isValid) {
      message.success('动态发布成功');
      showDongtai.value = false;
    }
  }
};

// 取消
const handleCancel = () => {
  showCaipu.value = false;
  showDongtai.value = false;
};
</script>

<style scoped>
.addIcon {
  font-size: 50px;
  color: #fcfdf7;
  cursor: pointer;
} 
</style>