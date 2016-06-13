/**
 * Created by xiaqiulei on 16/6/8.
 */

import * as actions from "./action_types";
import HttpApi from "./../data/HttpApi";

function _fetch(isRefresh) {
    return {
        type: actions.FETCH_GET_STORY_LIST,
        isRefresh: isRefresh,
        themeDesc: null,
        themeImageUrl: null,
        topStories: [],
        stories: []
    };
}
function _receive(topStories, stories, themeDesc, themeImageUrl) {
    if (!topStories) {
        topStories = [];
    }
    if (!stories) {
        stories = [];
    }
    return {
        type: actions.RECEIVER_GET_STORY_LIST,
        isRefresh: false,
        topStories,
        stories,
        themeDesc,
        themeImageUrl
    };
}

export function doLoadHomeList(isRefresh) {
    return function (dispatch) {
        // start
        dispatch(_fetch(isRefresh));

        return new HttpApi()
            .getHomeStoryList()
            .then((respJson)=> {
                var topStories = [];
                if (respJson && respJson['top_stories']) {
                    topStories.push(...respJson['top_stories']);
                }

                var stories = [];
                if (respJson && respJson.stories) {
                    stories.push(...respJson.stories);
                }
                dispatch(_receive(topStories, stories, null, null));
            })
            .catch(()=> {
                dispatch(_receive([], [], null, null));
            });
    };
}

export function doLoadNormalList(isRefresh, themeId) {
    return function (dispatch) {
        // start
        dispatch(_fetch(isRefresh));

        return new HttpApi()
            .getNormalStoryList(themeId)
            .then((respJson)=> {
                var stories = [];
                if (respJson && respJson.stories) {
                    stories = stories.concat(respJson.stories);
                }
                dispatch(_receive([], stories, respJson.description, respJson.background));
            })
            .catch(()=> {
                dispatch(_receive([], [], null, null));
            });
    };
}