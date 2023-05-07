<script setup lang="ts">
import { Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { ref } from "vue";

const address = ref();
const showError = ref(false);
const privateKey = ref();

const updateValue = (e: Event) => {
  if (address.value) address.value = undefined;
  if (showError.value) showError.value = false;

  const target = e.target as HTMLTextAreaElement;
  let value = target.value || "0x";
  if (value.startsWith("0x")) {
    if (value.length < 66) return;
    if (value.length > 66) {
      showError.value = true;
      return;
    }
  } else {
    if (value.length < 64) return;
    if (value.length > 64) {
      showError.value = true;
      return;
    }
    value = `0x${value}`;
  }

  try {
    address.value = privateKeyToAccount(value as Hex).address;
  } catch (e) {
    showError.value = true;
  }
};
</script>

<template>
  <div class="flex flex-col items-center p-4">
    <h3 class="my-6 text-2xl font-bold">Private Key 查 Public Address</h3>

    <textarea
      v-model="privateKey"
      class="textarea textarea-bordered w-full h-40"
      placeholder="输入要查询地址的Private Key"
      @input="updateValue"
    ></textarea>

    <p
      v-if="address"
      class="my-6 shadow-xl border-solid border-black bg-gray-50 p-4"
    >
      该 Private Key 的 Address 为: {{ address }}
    </p>
    <p v-if="showError" class="text-red-500">
      该 Private Key 无效，请输入有效 Key 后尝试！
    </p>
  </div>
</template>

<style scoped></style>
