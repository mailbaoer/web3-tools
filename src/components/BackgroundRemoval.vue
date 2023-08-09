<script setup lang='ts'>
import imglyRemoveBackground from '@imgly/background-removal';
import { ref, watch } from 'vue';

const imageURL = ref<any>(null);
const originalImage = ref<any>(null);
const isLoading = ref(false);

const removeBackground = async (image: string) => {
  const blob: Blob = await imglyRemoveBackground(image);
  imageURL.value = URL.createObjectURL(blob);
};

const file = ref<any>(null);
const changeImage = (e: any) => {
  file.value = e.target.files[0];
  originalImage.value = URL.createObjectURL(file.value);
};

watch(() => file.value, async () => {
  isLoading.value = true;
  await removeBackground(file.value);
  isLoading.value = false;
});
</script>

<template>
  <div class='flex flex-col items-center justify-center p-4'>
    <h3 class='my-6 text-2xl font-bold'>Remove Image Background</h3>
    <div class='flex space-x-6 h-full'>
      <img :src='originalImage' width='300' height='auto' class='min-h-16' alt='original image' />
      <div v-if='isLoading' class='w-[300px] h-full flex items-center justify-center'>
        <span class='loading loading-ring loading-lg w-100 h-100 bg-gray-200 z-10'></span>
      </div>
      <img v-else :src='imageURL' width='300' height='auto' class='min-h-16' alt='after image' />
    </div>
    
    <input type='file' :disabled='isLoading' class='file-input file-input-bordered w-full h-full my-4 max-w-xs'
           @change='changeImage' />
  </div>
</template>
