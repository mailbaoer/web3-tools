<script setup lang="ts">
import { Icon } from "@iconify/vue";
import dayjs from "dayjs";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const timeInS = ref();
const timeInMs = ref();
const timeNow = ref();

onMounted(() => {
  setInterval(() => {
    setTimeout(() => {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth() + 1; //得到月份
      var date = now.getDate(); //得到日期
      var hour = now.getHours(); //得到小时数
      var minute = now.getMinutes(); //得到分钟数
      var second = now.getSeconds(); //得到秒数
      timeNow.value = `${year}-${month}-${date} ${hour}:${minute}:${second}`;
      timeInS.value = Math.floor(now.getTime() / 1000);
      timeInMs.value = now.getTime();
    }, 100);
  }, 100);
});

onBeforeUnmount(() => {
  // clearInterval();
});

const timestamp = ref(dayjs().unix());
const date = ref(dayjs().format("YYYY-MM-DD hh:mm:ss"));

watch(timestamp, () => {
  if (!timestamp.value) date.value = "";
  date.value = dayjs.unix(timestamp.value).format("YYYY-MM-DD hh:mm:ss");
});

watch(date, () => {
  if (!date.value) timestamp.value = 0;
  timestamp.value = dayjs(date.value).unix();
});
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4">
    <h3 class="my-6 text-2xl font-bold">Unix 时间戳</h3>

    <p class="w-full">当前时间：{{ timeNow }}</p>
    <p class="w-full">时间戳：{{ timeInS }} 秒，{{ timeInMs }} 毫秒</p>
    <div class="flex flex-col md:flex-row items-center">
      <input
        type="text"
        v-model="timestamp"
        placeholder="unix 时间戳"
        class="input input-bordered w-full max-w-xs"
      />
      <Icon icon="ph:arrows-left-right-thin" width="32" class="my-4 md:mx-4" />
      <input
        type="text"
        v-model="date"
        placeholder="YYYY-MM-DD hh:mm:ss"
        class="input input-bordered w-full max-w-xs"
      />
    </div>
  </div>
</template>

<style scoped></style>
