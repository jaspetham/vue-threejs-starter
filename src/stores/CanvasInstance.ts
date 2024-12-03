import { defineStore } from 'pinia'
import { ref } from 'vue'
import Canvas from '@/components/Scene/Canvas'

// Define the store
export const useCanvasStore = defineStore('canvas', () => {
  const canvasInstance = ref<Canvas | null>(null)

  const setCanvasInstance = (instance: Canvas) => {
    canvasInstance.value = instance
  }

  return {
    canvasInstance,
    setCanvasInstance,
  }
})
