<template>
  <div>
    <template v-if="pending">
      ça charge
    </template>

    <template v-else>
      <div class="grid grid-cols-3 mx-auto gap-8 w-96">
        <NuxtLink :to="`/events/${event.slug}`" v-for="event in data" :key="event.slug">
          <img :src="event.cover.url" alt="" class="w-16">
          <span>{{ event.name }}</span>
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">

import type {EventsResponse} from "~/models/event.model";

const { find } = useStrapi()

const { data, pending, error } = await useAsyncData('events', async () => {
  return await find<EventsResponse>('events', {
    populate: '*',
  }).then(res => res.data);
});

</script>

<style lang="scss" scoped>

</style>