import type {Image, Meta} from "./strapi.model";
import type {Event} from "./event.model"

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