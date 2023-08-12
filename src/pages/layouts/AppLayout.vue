<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const openAbout = () => {
  const modal = document.getElementById("AboutModal") as HTMLInputElement;
  modal.checked = !modal.checked;
};
</script>

<template>
  <div class="max-w-1200px min-h-screen">
    <Header />
    <div class="w-full flex flex-col items-center justify-center p-4 md:p-10">
      <h1 class="text-4xl font-bold">常用工具</h1>
      <p class="mt-6">
        <button class="mx-2 btn btn-ghost" @click="router.push('/')">
          列表
        </button>
        <span class="mx-2">|</span>
        <button class="mx-2 btn btn-ghost" @click="openAbout">关于</button>
      </p>
      <div class="divider"></div>
      <RouterView></RouterView>
      <About />
    </div>
  </div>
</template>
