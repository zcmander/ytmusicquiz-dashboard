import { DashboardState } from "../state";
import { DashboardActionTypes, GAME_STATUS } from "../actionTypes/dashboarActionTypes";

const initialState: DashboardState = {
    question_progress: 0,
    question_count: 0,
}

export const dashboardReducer = (
    state = initialState,
    action: DashboardActionTypes): DashboardState  =>
{
    switch (action.type)
    {
        case GAME_STATUS:
            return {
                question_count: action.question.count,
                question_progress: action.question.progress,
            }
        default:
            return state;
    }

}