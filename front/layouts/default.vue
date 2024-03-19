<template>
  <main role="main">
    <div class="py-4 px-12 border-b border-white flex gap-4">
      <nuxt-link to="/">Home</nuxt-link>

      <nuxt-link :to="`/events/${event.slug}`" v-for="event in events">{{event.name}}</nuxt-link>
    </div>
    <slot/>

    <footer>
    </footer>
  </main>
</template>

<script setup lang="ts">
import type {EventsResponse} from "~/models/event.model";

const { find } = useStrapi()

const { data: events, pending: eventsPending } = await useAsyncData('events', async () => {
  return await find<EventsResponse>('events', {
    populate: '*',
  }).then(res => res.data);
});
</script>

<style lang="scss" scoped>

</style>