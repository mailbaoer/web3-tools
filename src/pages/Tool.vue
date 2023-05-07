<script setup lang="ts">
import { useRoute } from "vue-router";

import Base64Code from "@/components/Base64Code.vue";
import CreateAccount from "@/components/CreateAccount.vue";
import GeoIP from "@/components/GeoIP.vue";
import HexNumberConvert from "@/components/HexNumberConvert.vue";
import JsonFormat from "@/components/JsonFormat.vue";
import PasswordGenerate from "@/components/PasswordGenerate.vue";
import PrivateKeyReverse from "@/components/PrivateKeyReverse.vue";
import SignMessage from "@/components/SignMessage.vue";
import URLCode from "@/components/URLCode.vue";
import UnixTimestamp from "@/components/UnixTimestamp.vue";

const route = useRoute();

const tools: { [title: string]: object } = {
  PrivateKeyReverse: PrivateKeyReverse,
  HexNumberConvert: HexNumberConvert,
  CreateAccount: CreateAccount,
  SignMessage: SignMessage,
  URLCode: URLCode,
  Base64Code: Base64Code,
  UnixTimestamp: UnixTimestamp,
  PasswordGenerate: PasswordGenerate,
  GeoIP: GeoIP,
  JsonFormat: JsonFormat,
};
</script>

<template>
  <div class="w-full flex justify-center">
    <KeepAlive>
      <div
        class="w-full md:w-1/2 flex justify-center card card-bordered bg-base-100 shadow-xl"
      >
        <component :is="tools[route.params.id as string]"></component>
      </div>
    </KeepAlive>
  </div>
</template>

<style scoped></style>
