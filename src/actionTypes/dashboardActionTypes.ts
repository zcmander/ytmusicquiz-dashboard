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

export const GAME_OVER = "game.over";

export interface CumulativeHistory {
    index: string;

    [key: string]: number | string;
}

export interface GameOverAction {
    type: typeof GAME_OVER;
    stats: PlayerStatisticsStatus[];
    cumhist: CumulativeHistory[];
}

export const GAME_FINISH = "game.finish";

export interface GameFinishAction {
    type: typeof GAME_FINISH;
}

export const CONTROL_PLAYPAUSE = "control.playpause";

export interface ControlPlayPauseAction {
    type: typeof CONTROL_PLAYPAUSE;
}

export const CONTROL_REPLAY = "control.replay";

export interface ControlReplayAction {
    type: typeof CONTROL_REPLAY;
}

export const DASHBOARD_ID = "dashboard.id";

export interface DashboardIdAction {
    type: typeof DASHBOARD_ID;
    dashboard_id: string;
}

export const CONTROL_CONNECT = "control.connect";

export interface ConnectAction {
    type: typeof CONTROL_CONNECT;
}

export type DashboardActionTypes = GameStatusAction
    | GameAnswerAction
    | GameOverAction
    | ControlPlayPauseAction
    | ControlReplayAction
    | DashboardIdAction
    | ConnectAction
    | GameFinishAction;