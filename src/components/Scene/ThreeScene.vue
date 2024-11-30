<template>
  <div ref="canvasContainer" id="container" class="canvas-container bg-gray-800 p-4"></div>
</template>

<script lang="ts" setup>
  import Canvas from "./Canvas";
  import { onMounted, ref } from 'vue';

  const canvasInstance = ref(null);
  onMounted(() => {
    canvasInstance.value = new Canvas({
      dom: document.getElementById("container")
    });
  });
</script>

<style lang="scss" scoped>
.canvas-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
