import request from '@/untils/request'

export interface RecipeAuthor {
  userId: number
  nickname: string
  avatar: string
}

export interface RecipeIngredient {
  name: string
  quantity: string
}

export interface RecipeStep {
  step: number
  description: string
  image: string | null
}

export interface Recipe {
  id: number
  title: string
  intro: string
  description: string
  coverImage: string
  cookingTime: string
  visibility: 'public' | 'private' | string
  publishTime: string
  updateTime: string
  viewCount: number
  likeCount: number
  collectCount: number
  commentCount: number
  author: RecipeAuthor
  ingredients: RecipeIngredient[]
  steps: RecipeStep[]
  tags: string[]
}

export function getHealth(): Promise<string> {
  return request.get<string>('/recipes/health', undefined, { showLoading: false })
}

export function getRecipeById(id: number): Promise<Recipe> {
  return request.get<Recipe>(`/recipes/${id}`)
}

export function getRecipeList(): Promise<Recipe[]> {
  return request.get<Recipe[]>('/recipes')
}
