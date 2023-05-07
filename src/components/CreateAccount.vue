<script setup lang="ts">
import { bytesToHex } from "viem";
import { english, generateMnemonic, mnemonicToAccount } from "viem/accounts";
import { onMounted, ref } from "vue";

type Wallet = {
  address: string | undefined;
  mnemonicPhrase: string[] | undefined;
  privateKey: string | undefined;
};

const wallet = ref<Wallet>({
  address: undefined,
  privateKey: undefined,
  mnemonicPhrase: undefined,
});
const createWallet = () => {
  const mnemonic = generateMnemonic(english);
  const account = mnemonicToAccount(mnemonic);
  const hdKey = account.getHdKey();

  wallet.value = {
    address: account.address,
    mnemonicPhrase: mnemonic.split(" "),
    privateKey: bytesToHex(hdKey.privateKey || Uint8Array.from([])),
  };
};

onMounted(() => {
  createWallet();
});
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4">
    <h3 class="my-6 text-2xl font-bold">创建新账号</h3>

    <div v-if="wallet" class="m-2 w-full break-all border-solid p-4 text-left">
      <h4>Address:</h4>
      <p>{{ wallet.address }}</p>
      <h4 class="mt-4">助记词:</h4>

      <div
        v-for="word in wallet.mnemonicPhrase"
        :key="word"
        class="badge badge-lg badge-outline m-2 p-4"
      >
        {{ word }}
      </div>

      <h4 class="mt-4 break-all">Private Key:</h4>
      <p>{{ wallet.privateKey }}</p>
    </div>
    <button class="btn btn-wide" @click="createWallet">重新创建</button>
  </div>
</template>

<style scoped></style>
