<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const decode = ref("");
const encode = ref("");

watch(encode, () => {
  decode.value = Buffer.from(encode.value, "base64").toString();
});

watch(decode, () => {
  encode.value = Buffer.from(decode.value).toString("base64");
});

const withNum = ref(true);
const withLower = ref(true);
const withUpper = ref(true);
const withSpecial = ref(true);
const passwordLength = ref(12);
const password = ref();

const numList = "0123456789";
const lowerList = "abcdefghijklmnopqrstuvwxyz";
const upperList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const specialList = "!@#$%^&*()";

const generatePassword = () => {
  password.value = "";
  let list = "";

  if (withNum.value) list += numList;
  if (withLower.value) list += lowerList;
  if (withUpper.value) list += upperList;
  if (withSpecial.value) list += specialList;

  for (let i = 0; i < passwordLength.value; i++) {
    const rand = Math.floor(Math.random() * list.length);
    password.value += list.substring(rand, rand + 1);
  }
};

const regenerate = () => {
  generatePassword();
};

onMounted(() => {
  generatePassword();
});
</script>

<template>
  <div class="flex flex-col p-4">
    <h3 class="my-6 text-2xl font-bold text-center">密码生成器</h3>

    <p class="w-full break-all">通用密码字符库：</p>
    <p class="w-full flex items-center ml-2 my-2">
      <input
        type="checkbox"
        v-model="withNum"
        class="checkbox mr-2"
      />数字字符库：{{ numList }}
    </p>
    <p class="w-full flex items-center ml-2 my-2">
      <input
        type="checkbox"
        v-model="withLower"
        class="checkbox mr-2"
      />小写字符库：{{ lowerList }}
    </p>
    <p class="w-full flex items-center ml-2 my-2">
      <input
        type="checkbox"
        v-model="withUpper"
        class="checkbox mr-2"
      />大写字符库：{{ upperList }}
    </p>
    <p class="w-full break-all">特殊字符库：</p>
    <p class="w-full flex items-center ml-2 my-2">
      <input
        type="checkbox"
        v-model="withSpecial"
        class="checkbox mr-2"
      />一般字符库：{{ specialList }}
    </p>
    <p class="w-full my-2">
      密码长度：
      <input
        type="text"
        v-model="passwordLength"
        placeholder="Type here"
        class="input input-bordered w-full max-w-xs"
      />
    </p>

    <p>生成的密码为：</p>
    <p class="w-full text-green-400 break-all">{{ password }}</p>
    <button class="btn btn-wide my-4 mx-auto" @click="regenerate">
      重新生成
    </button>
  </div>
</template>

<style scoped></style>
