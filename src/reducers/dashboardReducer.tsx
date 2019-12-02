import { DashboardState } from "../state";
import { DashboardActionTypes, GAME_STATUS } from "../actionTypes/dashboardActionTypes";

const initialState: DashboardState = {
    loaded: false,
    question_progress: 0,
    question_count: 0,
    youtube_id: null,
    start: 0,
    end: 0,
    history: [],
    stats: []
}

export const dashboardReducer = (
    state = initialState,
    action: DashboardActionTypes): DashboardState  =>
{
    switch (action.type)
    {
        case GAME_STATUS:
            return {
                loaded: true,
                question_count: action.question.count,
                question_progress: action.question.progress,
                youtube_id: action.question.youtube.id,
                start: action.question.youtube.start,
                end: action.question.youtube.end,
                history: action.history,
                stats: action.stats,
            }
        default:
            return state;
    }

}