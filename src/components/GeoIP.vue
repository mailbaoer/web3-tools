<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";

type infoStruct = {
  organization?: string;
  longitude?: number;
  city?: string;
  timezone?: string;
  isp?: string;
  offset?: number;
  region?: string;
  asn?: string;
  country?: string;
  ip?: string;
  latitude?: string;
  postal_code?: string;
  continent_code?: string;
  country_code?: string;
  region_code?: string;
};
const ipInfo = ref<infoStruct>();
const getMyIp = async () => {
  const response = await axios.get("https://api.ip.sb/geoip");
  if (response.status !== 200) {
    console.log(response.data);
  } else {
    ipInfo.value = response.data;
  }
};

onMounted(async () => {
  await getMyIp();
});
</script>
<template>
  <div class="flex flex-col items-center justify-center p-4">
    <h3 class="my-6 text-2xl font-bold">GeoIP</h3>

    <table class="table table-fixed w-full md:w-1/2 text-center">
      <!-- head -->
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr>
          <th>IP</th>
          <td v-if="ipInfo">{{ ipInfo.ip }}</td>
        </tr>
        <!-- row 2 -->
        <tr>
          <th>Country</th>
          <td v-if="ipInfo">
            {{ ipInfo.country }} ({{ ipInfo.country_code }})
          </td>
        </tr>
        <!-- row 3 -->
        <tr>
          <th>Timezone</th>
          <td v-if="ipInfo" class="text-ellipsis overflow-hidden">
            {{ ipInfo.timezone }}
          </td>
        </tr>
        <tr>
          <th>Offset</th>
          <td v-if="ipInfo">{{ ipInfo.offset }}</td>
        </tr>
        <!-- row 4 -->
        <tr>
          <th>Location</th>
          <td v-if="ipInfo">{{ ipInfo.longitude }}, {{ ipInfo.latitude }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
