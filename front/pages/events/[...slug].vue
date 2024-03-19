<template>
  <div v-if="!pending">
    <h1>{{ event.name }}</h1>
    <img :src="event.cover.url" alt="">
    <ul>
      <li v-for="artist in event.artists">
        {{ artist.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { EventResponse } from '~/models/event.model'

const { findOne } = useStrapi()
const route = useRoute()

const { data: event, pending, error } = useAsyncData('event', () =>
    findOne<EventResponse>(`events/${route.params.slug}`)
        .then(res => res.data)
)
</script>

<style scoped lang="scss">

</style>