export const GAME_STATUS = "game.status";

export interface YouTubeStatus {
    id: string | null;
}

export interface QuestionStatus {
    progress: number;
    count: number;

    youtube: YouTubeStatus
}

export interface GameStatusAction {
    type: typeof GAME_STATUS;

    question: QuestionStatus;
}


export type DashboardActionTypes = GameStatusAction;