

export interface DashboardState {
    loaded: boolean,
    question_progress: number;
    question_count: number;
    youtube_id: string | null;
    start: number;
    end: number;
}