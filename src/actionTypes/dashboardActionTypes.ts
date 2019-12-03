export const GAME_STATUS = "game.status";

export interface HistoryStatus {
    type: "player" | "players" | "failed",
    player: string;
    text: string;
}

export interface PlayerStatisticsStatus
{
    id: number;
    display_name: string;
    points: number;
}

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

    stats: PlayerStatisticsStatus[];
    history: HistoryStatus[];
    question: QuestionStatus;
}

export const GAME_ANSWER = "game.answer";

export interface AnswerStatus {
    artist: string;
    track: string;
    feat: string;
}

export interface Player {
    id: number;
    display_name: string;
}

export interface AnswerPlayer {
    player: Player;
    points: number;
}

export interface GameAnswerAction {
    type: typeof GAME_ANSWER;
    answer: AnswerStatus;
    correct_answered_players: AnswerPlayer[];
}

export type DashboardActionTypes = GameStatusAction | GameAnswerAction;