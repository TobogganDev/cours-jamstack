import type {Image, Meta} from "~/models/strapi.model";
import type {Event} from "~/models/event.model"

export interface Artist {
    id: number
    name: string
    created_at: Date
    updated_at: Date
    events: Event[]
}

export interface ArtistResponse {
    data: Artist
    meta: Meta
}

export interface ArtistsResponse {
    data: Artist[]
    meta: Meta
}