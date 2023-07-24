<script setup lang="ts">
import imglyRemoveBackground from '@imgly/background-removal';
import { onMounted, ref } from 'vue';

const image_src =
  'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

const url = ref(image_src);

const removeBackground = async (image: string) => {
  imglyRemoveBackground(image).then((blob: Blob) => {
    console.log('222222222222', URL.createObjectURL(blob));
    // The result is a blob encoded as PNG. It can be converted to an URL to be used as HTMLImage.src
    url.value = URL.createObjectURL(blob);
  });
};

onMounted(async () => {
  console.log('1111111111111');
  await removeBackground(image_src);
});
</script>

<template>
  <div>Test</div>
  <img :src="url" width="100" height="100" />
  <input type="file" class="file-input file-input-bordered w-full max-w-xs" />
</template>
