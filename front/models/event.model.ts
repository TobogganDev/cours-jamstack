import type {Artist} from './artist.model';
import type {Meta} from "./strapi.model";
import type {Type} from "./type.model";

export interface Event {
    id: number
    name: string
    slug: string
    date: Date
    artists: Artist[]
    types: Type[]
}

export interface EventResponse {
    data: Event
    meta: Meta
}

export interface EventsResponse {
    data: Event[]
    meta: Meta
}