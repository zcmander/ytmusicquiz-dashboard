export const CONNECTION_OPEN = "CONNECTION_OPEN";
export const CONNECTION_CLOSE = "CONNECTION_CLOSE";

interface ConnectionOpenAction {
    type: typeof CONNECTION_OPEN
}

interface ConnectionCloseAction {
    type: typeof CONNECTION_CLOSE
}

export type ConnectionActionTypes = ConnectionOpenAction | ConnectionCloseAction;