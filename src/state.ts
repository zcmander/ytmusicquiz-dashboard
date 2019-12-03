import { HistoryStatus, PlayerStatisticsStatus, AnswerStatus, AnswerPlayer } from "./actionTypes/dashboardActionTypes";

export interface QuestionState {
    progress: number;
    count: number;
    youtube_id: string | null;
    start: number;
    end: number;
    history: HistoryStatus[];
    stats: PlayerStatisticsStatus[],
}

export interface AnswerState {
    answer: AnswerStatus;
    correct_answered_players: AnswerPlayer[];
}

export interface DashboardState {
    loaded: boolean,
    state: "QUESTION" | "ANSWER",
    question: QuestionState | null;
    answer: AnswerState | null;
}
