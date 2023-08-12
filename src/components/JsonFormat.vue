<template>
  <div class="flex flex-col justify-center p-4">
    <h3 class="my-6 text-2xl font-bold text-center">JSON 格式化</h3>

    <textarea
      class="textarea textarea-bordered w-full h-40"
      placeholder="在此粘贴 JSON 字符串"
      v-model="inputJson"
    ></textarea>
    <pre class="break-all mt-4">{{ formattedJson }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const inputJson = ref("");
const formattedJson = ref("");

watch(inputJson, () => {
  try {
    if (!inputJson.value) {
      formattedJson.value = "";
    } else {
      let originalJson = inputJson.value.trim();
      // 如果输入的字符串以单引号开始并结束，移除这些单引号
      if (originalJson.startsWith("'") && originalJson.endsWith("'")) {
        originalJson = originalJson.slice(1, -1)
      }
      // 将所有的 \\ 替换为 \
      originalJson = originalJson.replace(/\\\\/g, '\\');
      console.log(originalJson, JSON.parse(originalJson))
      let parsedJson = JSON.parse(originalJson);
      while (typeof parsedJson === 'string' && (parsedJson.trim().startsWith('{') || parsedJson.trim().startsWith('['))) {
        parsedJson = JSON.parse(parsedJson);
      }
      
      formattedJson.value = JSON.stringify(parsedJson, null, 2);
    }
  } catch (error) {
    console.log(error)
    formattedJson.value = "无效的 JSON 字符串";
  }
});
</script>

<style scoped></style>
