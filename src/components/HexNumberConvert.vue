<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref, watch } from "vue";

const hexData = ref();
const numData = ref();

watch(hexData, () => {
  if (hexData.value.startsWith("0x")) {
    if (hexData.value === "0x") {
      numData.value = "";
    } else {
      numData.value = Number(hexData.value).toString(10);
    }
  } else {
    if (!hexData.value) {
      numData.value = "";
    } else {
      numData.value = Number(`0x${hexData.value}`).toString(10);
    }
  }
});
watch(numData, () => {
  if (!numData.value) {
    hexData.value = "";
  } else {
    hexData.value = `0x${Number(numData.value).toString(16)}`;
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4">
    <h3 class="my-6 text-2xl font-bold">16 进制 & 10进制互转</h3>

    <div class="flex flex-col md:flex-row items-center">
      <input
        type="text"
        v-model="hexData"
        placeholder="16 进制数据"
        class="input input-bordered w-full max-w-xs"
      />
      <Icon icon="ph:arrows-left-right-thin" width="32" class="my-4 md:mx-4" />
      <input
        type="text"
        v-model="numData"
        placeholder="10 进制数据"
        class="input input-bordered w-full max-w-xs"
      />
    </div>
  </div>
</template>

<style scoped></style>
