<script setup lang="ts">
import { allTools } from "@/composables/useTools";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const tools = allTools;
const router = useRouter();
const gotoTool = (name: string) => {
  router.push(`/tools/${name}`);
};
</script>

<template>
  <div class="w-full flex-col justify-center">
    <div v-for="list in tools" :key="list.title">
      <h2 class="text-3xl font-bold mt-6">{{ list.title }}</h2>
      <div class="flex flex-col md:flex-row flex-wrap">
        <div
          class="w-full h-[200px] md:w-1/4 p-5"
          v-for="tool in list.children"
          :key="tool.title"
        >
          <div
            class="card w-full h-full bg-base-100 shadow-xl cursor-pointer"
            @click="gotoTool(tool.name)"
          >
            <div class="card-body">
              <div class="flex items-baseline">
                <Icon :icon="tool.icon" />
                <h2 class="card-title mx-2">{{ tool.title }}</h2>
              </div>
              <p>{{ tool.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
