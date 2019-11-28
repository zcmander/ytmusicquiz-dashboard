import {
    ConnectionActionTypes,
    CONNECTION_CLOSE,
    CONNECTION_OPEN
} from "../actionTypes/connectionActionTypes";

interface ConnectionState {
    connected: boolean;
}

const initialState: ConnectionState = {
    connected: false,
}

export function connectionReducer(state = initialState, action: ConnectionActionTypes): ConnectionState
{
    switch(action.type) {
        case CONNECTION_OPEN:
            return {
                connected: true,
            };
        case CONNECTION_CLOSE:
            return {
                connected: false,
            }
        default:
            return state;
    }
}