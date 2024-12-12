import {Type} from "../../type"

export interface ItemResponse {
    market_hash_name: string
    currency: Type.Enums.CurrencyType
    suggested_price: number
    item_page: string
    market_page: string
    min_price: number
    max_price: number
    mean_price: number
    median_price: number
    quantity: number
    created_at: number
    updated_at: number
}