<template>
  <!-- chuangjiancaipu -->
  <div class="uppic">点击上传成品图</div>
  
  <div>
    <a-input v-model:value="value1" placeholder="输入菜谱标题" allow-clear />
    <br />
    <br />
    <a-textarea v-model:value="value2" placeholder="输入菜谱简介或心得" allow-clear />
  </div>
  <div>
    <h2>食材</h2>
    <a-space>
      1.
      用料:<a-input v-model:value="value" placeholder="Basic usage" />
      用量:<a-input v-model:value.lazy="value1" autofocus placeholder="Lazy usage" />
    </a-space>
    <a-space>
      2.
      用料:<a-input v-model:value="value" placeholder="Basic usage" />
      用量:<a-input v-model:value.lazy="value1" autofocus placeholder="Lazy usage" />
    </a-space>
    <br>
    <a-button>添加食材</a-button>
  </div>
  
  <div>
    <h2>做法步骤</h2>
    <a-space>
      步骤1：<a-input v-model:value="value" placeholder="Basic usage" /><br>
    </a-space>
    <br>
    <a-space>
      步骤2：<a-input v-model:value.lazy="value1" autofocus placeholder="Lazy usage" />
    </a-space>
    <br>
    <a-button>添加下一步</a-button>
  </div>
  <a-space>
      标签：<a-input v-model:value="value" placeholder="Basic usage" /><br>
    </a-space>
    <br>
    <a-space>
      谁可以看：<a-input v-model:value.lazy="value1" autofocus placeholder="Lazy usage" />
    </a-space>
</template>

<script>
  
</script>
<style scoped>
.uppic {
  width: 100%;
  height: 200px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>