<template>
  <div class="max-h-[70vh] overflow-y-auto px-1 space-y-6">
    <section class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-3">
      <div class="text-lg font-semibold text-gray-900">封面图片</div>
      <a-upload
        :before-upload="handleCoverUpload"
        :show-upload-list="false"
        accept="image/*"
        class="w-full flex items-center justify-center"
      >
        <div
          class="w-full h-48 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-gray-50 to-gray-100"
        >
          <template v-if="coverPreview">
            <img :src="coverPreview" alt="封面预览" class="w-full h-full object-cover rounded-xl" />
          </template>
          <template v-else>
            <div class="text-3xl opacity-70">📷</div>
            <div class="text-base font-medium text-gray-700">点击上传成品图</div>
            <div class="text-xs text-gray-400">建议尺寸 800x600px，JPG/PNG格式</div>
          </template>
        </div>
      </a-upload>
    </section>

    <section class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
      <div class="text-lg font-semibold text-gray-900">基本信息</div>
      <a-input
        v-model:value="form.title"
        placeholder="输入菜谱标题"
        allow-clear
        size="large"
        class="w-full"
      />
      <a-textarea
        v-model:value="form.intro"
        placeholder="输入菜谱简介或心得"
        allow-clear
        :rows="4"
        class="w-full"
      />
      <a-textarea
        v-model:value="form.description"
        placeholder="详细描述这道菜的做法与心得"
        allow-clear
        :rows="5"
        class="w-full"
      />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a-input
          v-model:value="form.cookingTime"
          placeholder="烹饪时间（例如：40分钟）"
          allow-clear
        />
        <span class="flex items-center gap-2">
          <span>谁能看见:</span>
          <a-radio-group v-model:value="form.visibility" class="flex gap-4">
            <a-radio value="public">公开</a-radio>
            <a-radio value="family">仅家庭</a-radio>
          </a-radio-group>
        </span>
        <div class="space-y-2">
          <div class="text-sm text-gray-600">标签（逗号分隔）</div>
          <a-input v-model:value="tagsInput" placeholder="下饭菜, 川菜, 辣" allow-clear />
        </div>
      </div>
    </section>

    <section class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
      <div class="flex items-center justify-between">
        <div class="text-lg font-semibold text-gray-900">食材清单</div>
        <a-button type="primary" ghost class="rounded-full" @click="addIngredient"
          >添加食材</a-button
        >
      </div>
      <div class="space-y-3">
        <div
          v-for="(item, idx) in form.ingredients"
          :key="idx"
          class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
        >
          <div class="text-orange-500 font-semibold w-6">{{ idx + 1 }}.</div>
          <a-input v-model:value="item.name" placeholder="用料" class="flex-1" allow-clear />
          <a-input v-model:value="item.quantity" placeholder="用量" class="flex-1" allow-clear />
        </div>
      </div>
    </section>

    <section class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
      <div class="flex items-center justify-between">
        <div class="text-lg font-semibold text-gray-900">做法步骤</div>
        <a-button type="primary" ghost class="rounded-full" @click="addStep">添加步骤</a-button>
      </div>
      <div class="space-y-4">
        <div
          v-for="(step, idx) in form.steps"
          :key="idx"
          class="p-4 bg-gray-50 rounded-lg border border-gray-100 space-y-2"
        >
          <div class="flex items-center gap-2 text-gray-800 font-semibold">
            <span class="inline-block w-2 h-2 rounded-full bg-green-500"></span>
            步骤 {{ step.step || idx + 1 }}
          </div>
          <a-input
            v-model:value="step.description"
            placeholder="描述操作步骤"
            class="w-full"
            allow-clear
          />
          <div class="text-sm text-gray-400">可在此处上传步骤图片（预留）</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { message } from 'ant-design-vue'
import type { Recipe } from '@/api/recipe'

const emit = defineEmits<{ (e: 'update', value: Recipe): void }>()

const form = reactive<Recipe>({
  id: 0,
  title: '',
  intro: '',
  description: '',
  coverImage: '/cookPic/placeholder.jpg',
  cookingTime: '',
  visibility: 'public',
  publishTime: new Date().toISOString(),
  updateTime: new Date().toISOString(),
  viewCount: 0,
  likeCount: 0,
  collectCount: 0,
  commentCount: 0,
  ingredients: [
    { name: '', quantity: '' },
    { name: '', quantity: '' },
  ],
  steps: [
    { step: 1, description: '', image: null },
    { step: 2, description: '', image: null },
  ],
  tags: [],
})

const tagsInput = ref('')
const coverPreview = ref<string>('')

const addIngredient = () => {
  form.ingredients.push({ name: '', quantity: '' })
}

const addStep = () => {
  const nextStep = (form.steps[form.steps.length - 1]?.step || form.steps.length) + 1
  form.steps.push({ step: nextStep, description: '', image: null })
}

const handleCoverUpload = async (file: File) => {
  // 无上传接口：转 base64 直塞 coverImage 给后端
  const toBase64 = (f: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(f)
    })

  try {
    const base64 = await toBase64(file)
    form.coverImage = base64
    coverPreview.value = base64
    message.success('封面已添加（base64）')
  } catch (e) {
    message.error('封面读取失败')
  }

  return false // 阻止 Upload 默认上传
}

watch(
  () => tagsInput.value,
  (val) => {
    form.tags = val
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  },
)
watch(
  form,
  (val) => {
    emit('update', JSON.parse(JSON.stringify(val)))
  },
  { deep: true },
)

const getValue = () => JSON.parse(JSON.stringify(form)) as Recipe
const validate = async () => true

defineExpose({ getValue, validate })
</script>
