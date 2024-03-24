<template>
  <div v-if="!pending" class="m-12">
    <nuxt-link to="/">< Back</nuxt-link>
    <div class="flex flex-col-reverse md:flex-row gap-12 justify-between mt-8">
      <div class="md:w-2/3">
        <h1 class="uppercase text-5xl font-bold">{{event.name}}</h1>
        <p class="text-white/25">{{event.date}}</p>
        <div class="mt-8">
          <h2 class="uppercase underline mb-4 font-semibold text-2xl">Line up</h2>
          <ul class="">
            <li v-for="artist in event.artists">
              {{artist.name}}
            </li>
          </ul>
        </div>
      </div>
      <div class="md:w-1/3">
        <img :src="event.cover.url" alt="" class="shadow-2xl">
      </div>
    </div>
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