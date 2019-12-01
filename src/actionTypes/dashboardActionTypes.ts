export const GAME_STATUS = "game.status";

/**
 * Parameters for Youtube player (WS interface)
 */
export interface YouTubeStatus {
    // Video id
    id: string | null;

    // Start playing at (seconds)
    start: number;

    // End playing at (seconds)
    end: number;
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