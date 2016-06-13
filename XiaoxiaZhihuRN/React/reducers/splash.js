/**
 * Created by xiaqiulei on 16/6/12.
 */

import * as action_types from "./../actions/action_types";

const initialState = {
    splash_info: null
};
export default function splash(state = initialState, action) {

    switch (action.type) {
        case action_types.FETCH_SPLASH:
        case action_types.RECEIVER_SPLASH:
            return {
                ...state,
                splash_info: action.splash_info
            };
        default:
            return state;
    }
}