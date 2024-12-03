<script lang="ts" setup>
  import Canvas from "./Canvas";
  import { onMounted } from 'vue';
  import { useCanvasStore } from "@/stores/CanvasInstance";
  const canvasStore = useCanvasStore();
  onMounted(() => {
    const canvasInstance = new Canvas({
      dom: document.getElementById("container"),
    });
    canvasStore.setCanvasInstance(canvasInstance);
  });
</script>

<template>
  <div ref="canvasContainer" id="container" class="canvas-container bg-gray-800 p-4"></div>
</template>

<style lang="scss" scoped>
.canvas-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
