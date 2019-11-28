export const GAME_STATUS = "game.status";

export interface QuestionStatus {
    progress: number;
    count: number;
}

export interface GameStatusAction {
    type: typeof GAME_STATUS;

    question: QuestionStatus;
}


export type DashboardActionTypes = GameStatusAction;