<template>
  <div v-if="!pending">
    <pre>{{ event.data }}</pre>
    <hr>
    <h1>{{ event.data.name }}</h1>
    <img :src="event.data.cover.url" alt="">
    <ul>
      <li v-for="artist in event.data.artists">
        {{ artist.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '~/models/event.model'

const { findOne } = useStrapi()
const route = useRoute()

const { data: event, pending, error } = useAsyncData('event', () =>
    findOne<Event>(`events/${route.params.slug}`)
)
</script>

<style scoped lang="scss">

</style>