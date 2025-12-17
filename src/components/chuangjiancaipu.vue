<template>
  <div class="recipe-form">
    <!-- 上传封面 -->
    <div class="form-section">
      <div class="section-title">封面图片</div>
      <div class="upload-area">
        <div class="upload-placeholder">
          <div class="upload-icon">📷</div>
          <div class="upload-text">点击上传成品图</div>
          <div class="upload-hint">建议尺寸 800×600px，JPG/PNG格式</div>
        </div>
      </div>
    </div>

    <!-- 基本信息 -->
    <div class="form-section">
      <div class="section-title">基本信息</div>
      <div class="form-row">
        <a-input 
          v-model:value="value1" 
          placeholder="输入菜谱标题" 
          allow-clear 
          size="large"
          class="form-input"
        />
      </div>
      <div class="form-row">
        <a-textarea 
          v-model:value="value2" 
          placeholder="输入菜谱简介或心得" 
          allow-clear
          :rows="4"
          class="form-textarea"
        />
      </div>
    </div>

    <!-- 食材部分 -->
    <div class="form-section">
      <div class="section-header">
        <div class="section-title">食材清单</div>
        <a-button type="primary" ghost class="add-button">添加食材</a-button>
      </div>
      <div class="ingredients-list">
        <div class="ingredient-item">
          <div class="ingredient-index">1.</div>
          <div class="ingredient-fields">
            <a-input v-model:value="value" placeholder="用料" class="field-input" />
            <a-input v-model:value.lazy="value1" placeholder="用量" class="field-input" />
          </div>
        </div>
        <div class="ingredient-item">
          <div class="ingredient-index">2.</div>
          <div class="ingredient-fields">
            <a-input v-model:value="value" placeholder="用料" class="field-input" />
            <a-input v-model:value.lazy="value1" placeholder="用量" class="field-input" />
          </div>
        </div>
      </div>
    </div>

    <!-- 做法步骤 -->
    <div class="form-section">
      <div class="section-header">
        <div class="section-title">做法步骤</div>
        <a-button type="primary" ghost class="add-button">添加步骤</a-button>
      </div>
      <div class="steps-list">
        <div class="step-item">
          <div class="step-header">步骤 1</div>
          <a-input v-model:value="value" placeholder="描述操作步骤" class="step-input" />
        </div>
        <div class="step-item">
          <div class="step-header">步骤 2</div>
          <a-input v-model:value.lazy="value1" placeholder="描述操作步骤" class="step-input" />
        </div>
      </div>
    </div>

    <!-- 标签和可见性 -->
    <div class="form-section">
      <div class="section-title">更多设置</div>
      <div class="settings-grid">
        <div class="setting-item">
          <div class="setting-label">标签</div>
          <a-input v-model:value="value" placeholder="输入标签，用逗号分隔" />
        </div>
        <div class="setting-item">
          <div class="setting-label">谁可以看</div>
          <a-input v-model:value.lazy="value1" placeholder="选择可见范围" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.recipe-form {
  padding: 0 4px;
  max-height: 70vh;
  overflow-y: auto;
}

/* 表单区域 */
.form-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0f0f0;
  transition: box-shadow 0.2s;
}

.form-section:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

/* 标题样式 */
.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f1f1f;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f0f0;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 60px;
  height: 2px;
  background: #ff7a45;
}

/* 上传区域 */
.upload-area {
  width: 100%;
  height: 200px;
  border: 3px dashed #e8e8e8;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s;
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
}

.upload-area:hover {
  border-color: #1890ff;
  background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
  transform: translateY(-2px);
}

.upload-placeholder {
  text-align: center;
  color: #8c8c8c;
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.7;
}

.upload-text {
  font-size: 16px;
  font-weight: 500;
  color: #595959;
  margin-bottom: 8px;
}

.upload-hint {
  font-size: 12px;
  color: #bfbfbf;
}

/* 表单行间距 */
.form-row {
  margin-bottom: 20px;
}

.form-row:last-child {
  margin-bottom: 0;
}

.form-input, .form-textarea {
  width: 100%;
}

/* 食材部分样式 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-button {
  border-radius: 20px;
  padding: 0 20px;
  height: 36px;
  font-weight: 500;
}

.ingredients-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ingredient-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: #fafafa;
  border-radius: 8px;
  border-left: 4px solid #ff7a45;
}

.ingredient-index {
  font-weight: 600;
  color: #ff7a45;
  min-width: 24px;
  font-size: 16px;
}

.ingredient-fields {
  display: flex;
  gap: 12px;
  flex: 1;
}

.field-input {
  flex: 1;
}

/* 步骤样式 */
.steps-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-item {
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
}

.step-header {
  font-weight: 600;
  color: #1f1f1f;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.step-header::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #52c41a;
  border-radius: 50%;
}

.step-input {
  width: 100%;
}

/* 设置区域 */
.settings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-label {
  font-weight: 500;
  color: #595959;
  font-size: 14px;
}

/* 滚动条美化 */
.recipe-form::-webkit-scrollbar {
  width: 8px;
}

.recipe-form::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.recipe-form::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.recipe-form::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>