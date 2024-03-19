<template>
  <main role="main">
    <TheHeader/>

    <slot/>

    <footer>
    </footer>
  </main>
</template>

<script setup lang="ts">
import TheHeader from "~/components/layouts/TheHeader.vue";
</script>

<style lang="scss" scoped>

</style>