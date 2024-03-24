<template>
  <main role="main" class="bg-[#1D1D1D] h-screen w-full">
    <TheHeader/>
    <slot/>
  </main>
</template>

<script setup lang="ts">

import TheHeader from "~/components/layouts/TheHeader.vue";
</script>

<style lang="scss" scoped>

</style>