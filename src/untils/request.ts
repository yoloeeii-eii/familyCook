import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosProgressEvent,
} from 'axios'
import { message, Modal } from 'ant-design-vue'
import router from '@/router'

// 环境配置
const isDevelopment = import.meta.env.MODE === 'development'
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// 请求配置
// 额外的请求配置扩展，用于控制全局loading和错误提示
interface RequestExtras {
  showLoading?: boolean
  showError?: boolean
}

const config: AxiosRequestConfig & RequestExtras = {
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  showLoading: true,
  showError: true,
}

// 创建axios实例
const service: AxiosInstance = axios.create(config)

// 正在进行的请求
let pendingRequests = 0
let loadingCloser: (() => void) | null = null

// 显示loading
const showLoading = () => {
  if (pendingRequests === 0) {
    const closer = message.loading('加载中...', 0) as unknown as () => void
    loadingCloser = closer
  }
  pendingRequests++
}

// 隐藏loading
const hideLoading = () => {
  pendingRequests--
  if (pendingRequests <= 0) {
    if (loadingCloser) {
      loadingCloser()
      loadingCloser = null
    }
    pendingRequests = 0
  }
}

// 请求拦截器
service.interceptors.request.use(
  (cfg: InternalAxiosRequestConfig & RequestExtras) => {
    if (cfg.showLoading !== false) {
      showLoading()
    }

    // 从本地存储读取token（避免对具体store的强依赖）
    const token = localStorage.getItem('token')
    if (token) {
      cfg.headers.Authorization = `Bearer ${token}`
    }

    return cfg
  },
  (error: AxiosError) => {
    console.error('请求拦截器错误:', error)
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const cfg = response.config as RequestExtras
    if (cfg.showLoading !== false) {
      hideLoading()
    }

    const res = response.data

    // 兼容两种返回格式：
    // 1) 直接返回数据
    // 2) 约定格式 { code, data, message }
    const isWrapped = res && typeof res === 'object' && 'code' in res

    if (!isWrapped) {
      return res
    }

    const wrapped = res as { code: number; data: unknown; message?: string }
    if (wrapped.code === 200) {
      return wrapped.data
    }

    const errorMessage = wrapped.message || '请求失败'

    if (cfg.showError !== false) {
      message.error(errorMessage)
    }

    switch (wrapped.code) {
      case 401:
        Modal.confirm({
          title: '系统提示',
          content: '登录状态已过期，请重新登录',
          okText: '重新登录',
          cancelText: '取消',
          onOk() {
            router.push('/login')
          },
        })
        break
      case 403:
        message.warning('权限不足，无法访问')
        break
      case 404:
        if (cfg.showError !== false) {
          message.warning('请求的资源不存在')
        }
        break
    }

    return Promise.reject(new Error(errorMessage))
  },
  (error: AxiosError) => {
    const cfg = (error.config || {}) as RequestExtras
    if (cfg.showLoading !== false) {
      hideLoading()
    }

    let errorMessage = '网络异常，请稍后重试'
    if (error.code === 'ECONNABORTED') {
      errorMessage = '请求超时，请检查网络连接'
    } else if ((error.message || '').includes('Network Error')) {
      errorMessage = '网络连接失败，请检查网络设置'
    }

    if (cfg.showError !== false) {
      message.error(errorMessage)
    }

    return Promise.reject(error)
  },
)

// 请求方法封装
const request = {
  // GET请求
  get<T = unknown>(
    url: string,
    params?: unknown,
    extraConfig?: AxiosRequestConfig & RequestExtras,
  ): Promise<T> {
    return service.get(url, { ...(extraConfig || {}), params })
  },

  // POST请求
  post<T = unknown>(
    url: string,
    data?: unknown,
    extraConfig?: AxiosRequestConfig & RequestExtras,
  ): Promise<T> {
    return service.post(url, data, extraConfig)
  },

  // PUT请求
  put<T = unknown>(
    url: string,
    data?: unknown,
    extraConfig?: AxiosRequestConfig & RequestExtras,
  ): Promise<T> {
    return service.put(url, data, extraConfig)
  },

  // DELETE请求
  delete<T = unknown>(
    url: string,
    data?: unknown,
    extraConfig?: AxiosRequestConfig & RequestExtras,
  ): Promise<T> {
    return service.delete(url, { ...(extraConfig || {}), data })
  },

  // 上传文件
  upload<T = unknown>(
    url: string,
    file: File,
    onProgress?: (progressEvent: AxiosProgressEvent) => void,
  ): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    return service.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: onProgress,
    })
  },

  // 下载文件
  download(url: string, filename: string, params?: unknown): Promise<void> {
    return request
      .get<Blob>(url, params, {
        responseType: 'blob',
        showLoading: false,
        showError: false,
      } as AxiosRequestConfig & RequestExtras)
      .then((blob) => {
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(downloadUrl)
      })
  },
}

export default request
