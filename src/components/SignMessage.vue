<script setup lang="ts">
import { personalSignMessage } from "@/composables/useAccount";
import { ref, watch } from "vue";

const message = ref("");
const signature = ref("");

const signMessage = async () => {
  signature.value = await personalSignMessage(message.value);
};

watch(message, () => {
  signature.value = "";
});
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4">
    <h3 class="my-6 text-2xl font-bold">消息签名</h3>

    <textarea
      v-model="message"
      class="textarea textarea-bordered w-full h-40"
      placeholder="请输入要签名的消息"
    />
    <Button class="mx-2 my-6" name="签名" @onClick="signMessage" />
    <div
      v-if="signature"
      class="p-4 my-6 shadow-xl bg-neutral-100 dark:bg-neutral-800 break-all"
    >
      <p>该消息的签名为:</p>
      <p>{{ signature }}</p>
    </div>
  </div>
</template>

<style scoped></style>
