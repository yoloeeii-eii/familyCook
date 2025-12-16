<template>
  <!-- 搜索栏
  信息弹窗
  热门菜
    卡片
      图片、标题
  最新上传
    卡片
      图片、标题、头像、用户名、点赞数 -->
  <!-- <div>搜索栏</div> -->
  <div class="contain">
    <div>
      <input type="text" placeholder="搜索菜谱..." />
      <button><SearchOutlined />搜索</button>
    </div>
    <!-- <div>信息弹窗</div> -->
    <div>
      <a-alert message="Informational Notes" type="info" show-icon>
      <template #icon><smile-outlined /></template>
    </a-alert>
    </div>
    <div>
      <h2>热门家常菜</h2>
      <!-- 这里是个轮播图 -->
      <div class="hotveg">
        <div>
          <a-card title="Card title" :bordered="false" style="width: 150px">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </a-card>
        </div>
        <div>
          <a-card title="Card title" :bordered="false" style="width: 150px">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </a-card>
        </div>
        <div>
          <a-card title="Card title" :bordered="false" style="width: 150px">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </a-card>
        </div>
      </div>
      </div>
    </div>
    
    <div>
      <h2>最新上传</h2>
      <div class="newup">
        <div>
          <a-card title="Card title" :bordered="false" style="width: 150px">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </a-card>
        </div>
        <div>
          <a-card title="Card title" :bordered="false" style="width: 150px">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </a-card>
        </div>
        <div>
          <a-card title="Card title" :bordered="false" style="width: 150px">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </a-card>
        </div>
    </div>
  </div>
</template>

<script setup>


</script>

<style scoped>
  .hotveg , .newup {
    display: flex;
    gap: 20px;
  }
  .contain {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
</style>