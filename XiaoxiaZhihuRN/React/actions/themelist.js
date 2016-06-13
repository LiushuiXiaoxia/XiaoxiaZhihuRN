/**
 * Created by xiaqiulei on 16/6/8.
 */

import * as actions from "./action_types";
import HttpApi from "./../data/HttpApi";

function _fetch(isRefresh) {
    return {
        type: actions.FETCH_THEME_LIST,
        isRefresh: isRefresh,
        allThemes: []
    };
}
function _receive(allThemes) {
    return {
        type: actions.RECEIVER_THEME_LIST,
        isRefresh: false,
        allThemes
    };
}

export function doLoadThemeList(isRefresh) {
    return function (dispatch) {
        // start
        dispatch(_fetch(isRefresh));

        return new HttpApi()
            .getAllThemes()
            .then((respJson)=> {
                var allThemes = [];
                allThemes.push({
                    name: '热门主题',
                    id: -1
                });
                if (respJson && respJson.others) {
                    allThemes = allThemes.concat(respJson.others);
                }
                dispatch(_receive(allThemes));
            })
            .catch(()=> {
                dispatch(_receive([]));
            });
    };
}