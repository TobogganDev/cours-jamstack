<template>
  <div class="flex gap-4">
    <template v-if="eventsPending">
      <span>filters charge</span>
    </template>
    <template v-else>
      <div class="w-1/3 flex flex-col gap-4 py-4 mx-2">
        <h3>events</h3>
        <button v-for="event in events" :key="event.slug" :class="filters.includes(event.name) ? 'bg-gray-900' : 'bg-white'" class="text-black" @click="addFilter(event.name)">
          {{event.name}}
        </button>
      </div>
    </template>

    <template v-if="artistsPending">
      <span>artist charge</span>
    </template>
    <template v-else>
      <div class="w-2/3 flex flex-col items-center justify-center">
        <div class="grid grid-cols-2 gap-4 w-full">
          <p v-for="artist in filteredArtists" :key="artist.id">{{ artist.name }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">

import type {EventsResponse} from "~/models/event.model";
import type {ArtistsResponse} from "~/models/artist.model";

const { find } = useStrapi()
const client = useStrapiClient()

const filters = ref<String[]>([])

const { data: events, pending: eventsPending } = await useAsyncData('events', async () => {
  return await find<EventsResponse>('events', {
    populate: '*',
  }).then(res => res.data);
});

const { data: artists, pending: artistsPending } = await useAsyncData('artists', async () => {
  return await find<ArtistsResponse>('artists', {
    populate: '*',
  }).then(res => res.data)
})

const addFilter = (filter: string) => {
  if(!filters.value.includes(filter)){
    filters.value.push(filter)
  } else {
    filters.value = filters.value.filter((f) => f !== filter)
  }
}

const filteredArtists = computed(() => {
  if (!filters.value.length) {
    return artists?.value
  }

  return artists?.value.filter((artist) => {
    return artist?.events?.some((event) => filters.value.includes(event.name))
  })
})
</script>

<style lang="scss" scoped>

</style>