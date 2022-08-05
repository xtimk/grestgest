import { BaseEntityType } from "./baseEntityType"

export interface AppTableParams {
    headers: string[],
    keysToRender: string[],
    body: BaseEntityType[],
}