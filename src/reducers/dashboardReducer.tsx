import { DashboardState } from "../state";
import {
    DashboardActionTypes,
    GAME_STATUS,
    GAME_ANSWER,
    GAME_OVER,
    CONTROL_PLAYPAUSE,
    CONTROL_REPLAY,
    DASHBOARD_ID,
    CONTROL_CONNECT,
    GAME_FINISH
} from "../actionTypes/dashboardActionTypes";

const initialState: DashboardState = {
    loaded: false,
    connected_to_game: false,
    id: null,
    state: "QUESTION",
    question: {
        progress: 0,
        count: 0,
        youtube_id: null,
        start: 0,
        end: 0,
        history: [],
        stats: [],
        playing: false,
        replay_counter: 0,
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
                id: state.id,
                loaded: true,
                connected_to_game: state.connected_to_game,
                state: "QUESTION",
                question: {
                    count: action.question.count,
                    progress: action.question.progress,
                    youtube_id: action.question.youtube.id,
                    start: action.question.youtube.start,
                    end: action.question.youtube.end,
                    history: action.history,
                    stats: action.stats,
                    playing: true,
                    replay_counter: 0,
                },
                answer: null,
                gameover: null,
            };

        case GAME_ANSWER:
            return {
                id: state.id,
                loaded: true,
                connected_to_game: state.connected_to_game,
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
                id: state.id,
                connected_to_game: state.connected_to_game,
                loaded: true,
                state: "GAMEOVER",
                gameover: {
                    stats: action.stats,
                    cumhist: action.cumhist,
                },
                question: null,
                answer: null,
            };

        case CONTROL_PLAYPAUSE:
            if (!state.question)
            {
                return state;
            }

            return {
                ...state,
                question: {
                    ...state.question,
                    playing: !state.question.playing,
                }
            }

        case CONTROL_REPLAY:
            if (!state.question)
            {
                return state;
            }

            return {
                ...state,
                question: {
                    ...state.question,
                    replay_counter: state.question.replay_counter + 1,
                }
            }

        case CONTROL_CONNECT:
            return {
                ...state,
                connected_to_game: true,
            }

        case DASHBOARD_ID:
            return {
                ...state,
                id: action.dashboard_id,
            }

        case GAME_FINISH:
            window.location.reload();
            return state;

        default:
            return state;
    }
}