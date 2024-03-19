import type {Artist} from "~/models/artist.model";
import type {Meta} from "~/models/strapi.model";

export interface Event {
    id: number
    name: string
    slug: string
    date: Date
    artists: Artist[]
}

export interface EventResponse {
    data: Event
    meta: Meta
}

export interface EventsResponse {
    data: Event[]
    meta: Meta
}