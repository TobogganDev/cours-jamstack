import type {Event} from "./event.model";
import {Meta} from "./strapi.model";

export interface Type {
    id: number
    type: string
    Events: Event[]
}