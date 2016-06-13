/**
 * Created by xiaqiulei on 16/6/12.
 */

import * as action_types from "./../actions/action_types";

const initialState = {
    isRefresh: false,
    stories: [],
    topStories: [],
    themeDesc: null,
    themeImageUrl: null
};
export default function themelist(state = initialState, action) {

    switch (action.type) {
        case action_types.FETCH_THEME_LIST:
        case action_types.RECEIVER_THEME_LIST:
            return {
                ...state,
                isRefresh: action.isRefresh,
                allThemes: action.allThemes
            };
        default:
            return state;
    }
}