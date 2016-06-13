/**
 * Created by xiaqiulei on 16/6/8.
 */

import * as actions from "./action_types";
import HttpApi from "./../data/HttpApi";

function _fetch(isLong, isRefresh) {
    return {
        type: isLong ? actions.FETCH_GET_COMMENT_LONG : actions.FETCH_GET_COMMENT_SHORT,
        isRefresh: isRefresh,
        comments: []
    };
}
function _receive(isLong, comments) {
    return {
        type: isLong ? actions.RECEIVER_GET_COMMENT_LONG : actions.RECEIVER_GET_COMMENT_SHORT,
        isRefresh: false,
        comments
    };
}

export function doLoadLongCommentList(isRefresh, storyId) {
    return function (dispatch) {
        // start
        dispatch(_fetch(true, isRefresh));

        new HttpApi()
            .getLongCommentList(storyId)
            .then((respJson)=> {
                var longs = [];
                if (respJson && respJson.comments) {
                    longs = [...respJson.comments];
                }
                dispatch(_receive(true, longs));
            })
            .catch(()=> {
                dispatch(_receive(true, []));
            });
    };
}

export function doLoadShortCommentList(isRefresh, storyId) {
    return function (dispatch) {
        // start
        dispatch(_fetch(false, isRefresh));

        return new HttpApi()
            .getShortCommentList(storyId)
            .then((respJson)=> {
                var longs = [];
                if (respJson && respJson.comments) {
                    longs = [...respJson.comments];
                }
                dispatch(_receive(false, longs));
            })
            .catch(()=> {
                dispatch(_receive(false, []));
            });
    };
}