<script setup lang="ts">
import { ref, watch } from "vue";

const decode = ref("");
const encode = ref("");

watch(encode, () => {
  decode.value = Buffer.from(encode.value, "base64").toString();
});

watch(decode, () => {
  encode.value = Buffer.from(decode.value).toString("base64");
});
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4">
    <h3 class="my-6 text-2xl font-bold">Base64 Encode / Decode</h3>

    <textarea
      v-model="decode"
      class="textarea textarea-bordered w-full h-40 my-4"
      placeholder="decode 结果"
    />

    <textarea
      v-model="encode"
      class="textarea textarea-bordered w-full h-40 my-4"
      placeholder="encode 结果"
    />
  </div>
</template>

<style scoped></style>
