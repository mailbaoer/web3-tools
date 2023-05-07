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
      const parsedJson = JSON.parse(inputJson.value);
      formattedJson.value = JSON.stringify(parsedJson, null, 2);
    }
  } catch (error) {
    formattedJson.value = "无效的 JSON 字符串";
  }
});
</script>

<style scoped></style>
