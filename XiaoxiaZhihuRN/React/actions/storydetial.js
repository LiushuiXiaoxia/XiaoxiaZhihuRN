/**
 * Created by xiaqiulei on 16/6/8.
 */

import * as actions from "./action_types";
import HttpApi from "./../data/HttpApi";

function _fetch() {
    return {
        type: actions.FETCH_GET_STORY_DETAIL,
        storyDetail: null
    };
}
function _receive(storyDetail) {
    return {
        type: actions.RECEIVER_GET_STORY_DETAIL,
        storyDetail
    };
}

export function doLoadDetail(storyId) {
    return function (dispatch) {
        // start
        dispatch(_fetch());

        return new HttpApi()
            .getStoryDetail(storyId)
            .then((respJson)=> {
                dispatch(_receive(respJson));
            })
            .catch(()=> {
                dispatch(_receive(null));
            });
    };
}