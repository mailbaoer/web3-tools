<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["onClick"]);
const click = () => {
  emits("onClick");
};
</script>

<template>
  <button class="btn btn-block md:btn-wide" @click="click">
    {{ name }}
  </button>
</template>
