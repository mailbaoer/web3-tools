<script lang="ts" setup>
import { connectWallet, disconnectWallet } from '@/composables/useAccount';
import { formatAmountFromNumber } from '@/composables/useWeb3';
import { onMounted, ref } from 'vue';
import { globalStore } from '../store';

const connectDialog = ref(false);
const openConnect = () => {
  const element = document.getElementById('ConnectWalletModal') as HTMLInputElement;
  connectDialog.value = !element.checked;
};

const avatarURL = () => {
  return `https://cdn.stamp.fyi/avatar/${globalStore.account}`;
};

onMounted(async () => {
  await connectWallet();
});

const items = ref([{ title: 'Disconnect' }]);

const clickItem = async (title: string) => {
  switch (title) {
    case 'Disconnect':
      await disconnectWallet();
  }
};
</script>
<template>
  <div class="h-20 w-full flex justify-end items-center px-4">
    <ThemeSwitch />
    <div v-if="globalStore.displayName">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn">
          <img class="h-4 w-4 mx-1 rounded-full" :src="avatarURL()" />
          {{ globalStore.displayName }}
          ({{ formatAmountFromNumber(Number(globalStore.balance?.formatted) || 0) }} {{ globalStore.balance?.symbol }})
        </label>
        <ul tabindex="0" class="dropdown-content menu p-2 bg-base-100 w-full mt-2 border-solid shadow-md">
          <li v-for="(item, index) in items" :key="index">
            <a @click="clickItem(item.title)" class="!">
              {{ item.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <label
        for="ConnectWalletModal"
        @click="openConnect"
        class="btn btn-outline rounded-none"
        :class="globalStore.loading ? 'loading' : ''"
      >
        Connect
      </label>
    </div>
    <ConnectWallet />
  </div>
</template>
