<script setup lang="ts">
import {
  client,
  connectWallet,
  disconnectWallet,
} from "@/composables/useAccount";
</script>
<template>
  <input type="checkbox" id="ConnectWalletModal" class="modal-toggle" />
  <label for="ConnectWalletModal" class="modal cursor-pointer">
    <label class="modal-box relative text-center" for="">
      <h3 class="font-bold text-lg">Connect with your Wallet</h3>
      <div class="m-5 p-10">
        <div
          v-for="connector in client.connectors"
          :key="connector.name"
          class="my-4"
        >
          <label
            v-if="client.connector?.name !== connector.name"
            for="ConnectWalletModal"
            @click="connectWallet(connector)"
            class="btn btn-block"
          >
            {{ connector.name }}
          </label>
          <label
            v-else
            for="ConnectWalletModal"
            @click="disconnectWallet"
            class="btn btn-block"
          >
            disconnectWallet
          </label>
        </div>
      </div>
    </label>
  </label>
</template>
