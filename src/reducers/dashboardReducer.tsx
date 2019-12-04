import { DashboardState } from "../state";
import { DashboardActionTypes, GAME_STATUS, GAME_ANSWER, GAME_OVER } from "../actionTypes/dashboardActionTypes";

const initialState: DashboardState = {
    loaded: false,
    state: "QUESTION",
    question: {
        progress: 0,
        count: 0,
        youtube_id: null,
        start: 0,
        end: 0,
        history: [],
        stats: []
    },
    answer: null,
    gameover: null,
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
                state: "QUESTION",
                question: {
                    count: action.question.count,
                    progress: action.question.progress,
                    youtube_id: action.question.youtube.id,
                    start: action.question.youtube.start,
                    end: action.question.youtube.end,
                    history: action.history,
                    stats: action.stats,
                },
                answer: null,
                gameover: null,
            };

        case GAME_ANSWER:
            return {
                loaded: true,
                state: "ANSWER",
                answer: {
                    answer: action.answer,
                    correct_answered_players: action.correct_answered_players
                },
                question: null,
                gameover: null,
            };

        case GAME_OVER:
            return {
                loaded: true,
                state: "GAMEOVER",
                gameover: {
                    stats: action.stats,
                    cumhist: action.cumhist,
                },
                question: null,
                answer: null,
            };

        default:
            return state;
    }
}