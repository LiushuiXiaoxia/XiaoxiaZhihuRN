/**
 * Created by xiaqiulei on 16/6/12.
 */

import * as action_types from "./../actions/action_types";

const initialState = {
    storyDetail: null
};
export default function storydetail(state = initialState, action) {

    switch (action.type) {
        case action_types.FETCH_GET_STORY_DETAIL:
        case action_types.RECEIVER_GET_STORY_DETAIL:
            return {
                ...state,
                storyDetail: action.storyDetail
            };
        default:
            return state;
    }
}