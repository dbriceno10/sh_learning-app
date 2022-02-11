import axios from "axios";

export const SET_FILTER_CATEGORY = "SET_FILTER_CATEGORY"
export const SET_ORDER = "SET_ORDER"


export const setFilterCategory = (string) => {
    return{
        type: SET_FILTER_CATEGORY,
        payload: string
    }
}
export const setOrder = (string) => {
    return{
        type: SET_ORDER,
        payload: string
    }
}