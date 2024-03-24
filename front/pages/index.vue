<template>
  <div class="flex flex-col gap-12 m-12">
    <div class="w-full">
      <input type="text" v-model="searchQuery" placeholder="Search Event" name="search" id="search" class="w-full rounded-full px-8 py-4">
    </div>
    <template v-if="typePending">
      <span>Loading filters</span>
    </template>
    <template v-else>
      <div class="flex flex-col md:flex-row gap-4 py-4 mx-2 w-fit md:items-center">
        <button
            v-for="type in types"
            :key="type.type"
            :class="filters.includes(type.type) ? 'bg-[#4ADE80]' : 'bg-transparent'"
            class="px-4 py-2 rounded-full capitalize border-white/15 border transition-all"
            @click="addFilter(type.type)"
        >
          {{type.type}}
        </button>
        <button
            @click="reset()"
            class="flex capitalize text-white/25 px-4 py-2 rounded-full border-white/15 border"
        >
          X reset
        </button>
      </div>
    </template>

    <template v-if="eventsPending">
      <span>Loading Events</span>
    </template>
    <template v-else>
      <div class="flex flex-col gap-4 w-full">
        <nuxt-link
            v-for="event in filteredEvents"
            :key="event.slug"
            :to="'/events/' + event.slug"
            class="border-b border-white/15 py-4 px-4 flex justify-between items-center transition-all hover:bg-[#4ADE80]"
        >
          <img :src="event.cover.url" alt="" class="w-1/6">
          <p>{{event.name}}</p>
          <p class="opacity-25">{{event.date}}</p>

        </nuxt-link>
      </div>
    </template>
    <div class="w-full justify-center flex">
      <UPagination
          v-if="events?.meta"
          v-model="page"
          :page-count="events.meta.pagination.pageCount"
          :total="events?.meta.pagination.total"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import type {EventsResponse} from "~/models/event.model";
import type {Type} from "~/models/type.model";

const { find } = useStrapi()

const filters = ref<String[]>([])
const searchQuery = ref('')
const page = ref(1)
const pageSize = ref(3)

const { data: events, pending: eventsPending, error: eventError, refresh: eventRefresh } = useAsyncData('events', () =>
        find<EventsResponse>('events', {
          populate: '*',
          pagination: {
            page: page.value,
            pageSize: pageSize.value
          },
          filters: {
            types: {
              type: {
                $in: filters.value
              }
            }
          }
        }), {
      watch: [page, filters],
    }
);

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

  eventRefresh()
}

function reset() {
  filters.value = []
}

const filteredEvents = computed(() => {
  let eventFiltered = events.value.data

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