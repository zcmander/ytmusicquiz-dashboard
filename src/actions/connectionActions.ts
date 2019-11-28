import { CONNECTION_OPEN, CONNECTION_CLOSE } from "../actionTypes/connectionActionTypes";

export function connectionOpen() {
    return {
        type: CONNECTION_OPEN
    }
}

export function connectionClose() {
    return {
        type: CONNECTION_CLOSE
    }
}