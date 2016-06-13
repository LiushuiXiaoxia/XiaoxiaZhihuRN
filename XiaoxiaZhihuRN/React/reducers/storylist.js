/**
 * Created by xiaqiulei on 16/6/12.
 */

import * as action_types from "./../actions/action_types";

const initialState = {
    isRefresh: false
};
export default function storylist(state = initialState, action) {

    switch (action.type) {
        case action_types.FETCH_GET_STORY_LIST:
        case action_types.RECEIVER_GET_STORY_LIST:
            return {
                ...state,
                topStories: action.topStories,
                stories: action.stories,
                themeDesc: action.themeDesc,
                themeImageUrl: action.themeImageUrl
            };
        default:
            return state;
    }
}