import { HistoryStatus, PlayerStatisticsStatus, AnswerStatus, AnswerPlayer, CumulativeHistory } from "./actionTypes/dashboardActionTypes";

export interface QuestionState {
    progress: number;
    count: number;
    youtube_id: string | null;
    start: number;
    end: number;
    history: HistoryStatus[];
    stats: PlayerStatisticsStatus[];
    playing: boolean,
}

export interface AnswerState {
    answer: AnswerStatus;
    correct_answered_players: AnswerPlayer[];
}

export interface GameOverState {
    stats: PlayerStatisticsStatus[];
    cumhist: CumulativeHistory[];
}

export interface DashboardState {
    loaded: boolean,
    state: "QUESTION" | "ANSWER" | "GAMEOVER",
    question: QuestionState | null;
    answer: AnswerState | null;
    gameover: GameOverState | null;
}
