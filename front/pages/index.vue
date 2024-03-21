<template>
  <div class="flex flex-col gap-12">
    <div>
      <input type="text" v-model="searchQuery" name="search" id="search">
    </div>
    <template v-if="typePending">
      <span>filters charge</span>
    </template>
    <template v-else>
      <div class="w-1/3 flex flex-col gap-4 py-4 mx-2">
        <h3>events</h3>
        <button v-for="type in types" :key="type.type" :class="filters.includes(type.name) ? 'bg-gray-900' : 'bg-white'" class="text-black" @click="addFilter(type.type)">
          {{type.type}}
        </button>
        <button @click="reset()">reset</button>
      </div>
    </template>

    <template v-if="eventsPending">
      <span>artist charge</span>
    </template>
    <template v-else>
      <div class="w-2/3 flex flex-col items-center justify-center">
        <div class="grid grid-cols-2 gap-4 w-full">
          <p v-for="event in filteredEvents" :key="event.id">{{ event.name }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">

import type {EventsResponse} from "~/models/event.model";
import type {ArtistsResponse} from "~/models/artist.model";
import type {Type} from "~/models/type.model";

const { find } = useStrapi()

const filters = ref<String[]>([])
const searchQuery = ref('')

const { data: events, pending: eventsPending } = await useAsyncData('events', async () => {
  return await find<EventsResponse>('events', {
    populate: '*',
  }).then(res => res.data);
});

const { data: types, pending: typePending } = await useAsyncData('types', async () => {
  return await find<Type>('types', {
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

function reset() {
  filters.value = []
}

const filteredEvents = computed(() => {
  let eventFiltered = events.value

  if (filters.value.length) {
    eventFiltered = eventFiltered.filter((event) => {
      return event?.types?.some((type) => filters.value.includes(type.type))
    })
  }

  if (searchQuery.value) {
    const lowSearchQuery = searchQuery.value.toLowerCase()
    eventFiltered = eventFiltered.filter((event) => {
      return event.name.toLowerCase().includes(lowSearchQuery)
    })
  }
  return eventFiltered
})



</script>

<style lang="scss" scoped>

</style>