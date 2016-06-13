/**
 * Created by xiaqiulei on 16/6/12.
 */

import * as action_types from "./../actions/action_types";

const initialState = {
    isRefresh: false,
    longs: [],
    shorts: []
};
export default function storycomment(state = initialState, action) {

    switch (action.type) {
        case action_types.FETCH_GET_COMMENT_LONG:
        case action_types.RECEIVER_GET_COMMENT_LONG:
            return {
                ...state,
                isRefresh: action.isRefresh,
                longs: action.comments
            };
        case action_types.FETCH_GET_COMMENT_SHORT:
        case action_types.RECEIVER_GET_COMMENT_SHORT:
            return {
                ...state,
                isRefresh: action.isRefresh,
                shorts: action.comments
            };
        default:
            return state;
    }
}