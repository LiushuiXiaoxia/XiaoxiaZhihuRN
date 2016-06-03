/**
 * Created by xiaqiulei on 16/4/29.
 */
'use strict';

import AppLog from "../util/AppLog";

const API_START_INFO_URL = "http://news-at.zhihu.com/api/4/start-image/1080*1776";
const API_ALL_THEMES_URL = 'http://news-at.zhihu.com/api/4/themes';
const API_HOME_STORY_LIST_URL = 'http://news-at.zhihu.com/api/4/news/latest';
const API_NORMAL_STORY_LIST_URL = 'http://news-at.zhihu.com/api/4/theme/';
const API_STORY_DETAIL_URL = 'http://news-at.zhihu.com/api/4/news/';
const API_LONG_COMMENT_URL = 'http://news-at.zhihu.com/api/4/story/{id}/long-comments';
const API_SHORT_COMMENT_URL = 'http://news-at.zhihu.com/api/4/story/{id}/short-comments';

class Api {

    getStartInfo() {
        var requestUrl = API_START_INFO_URL;
        AppLog.i("Api.getStartInfo requestUrl = " + requestUrl);

        return new Promise((resove, reject)=> {
            fetch(requestUrl)
                .then((resp)=> {
                    AppLog.i("Api.getStartInfo resp = " + resp);
                    return resp.json();
                })
                .then((respJson)=> {
                    AppLog.i("Api.getStartInfo respJson = " + respJson);
                    resove(respJson);
                })
                .catch((error)=> {
                    AppLog.e("Api.getStartInfo error = " + error);
                    reject(error);
                })
                .done();
        });
    }

    getAllThemes() {
        var requestUrl = API_ALL_THEMES_URL;
        AppLog.i("Api.getAllThemes requestUrl = " + requestUrl);
        return new Promise((resove, reject)=> {
            fetch(requestUrl)
                .then((resp)=> {
                    AppLog.i("Api.getAllThemes resp = " + resp);
                    return resp.json();
                })
                .then((respJson)=> {
                    AppLog.i("Api.getAllThemes respJson = " + respJson);
                    resove(respJson);
                })
                .catch((error)=> {
                    AppLog.e("Api.getAllThemes error = " + error);
                    reject(error);
                })
                .done();
        });
    }

    getNormalStoryList(id) {
        var requestUrl = API_NORMAL_STORY_LIST_URL + id;
        AppLog.i("Api.getNormalStoryList requestUrl = " + requestUrl);

        return new Promise((resove, reject)=> {
            fetch(requestUrl)
                .then((resp)=> {
                    AppLog.i("Api.getNormalStoryList resp = " + resp);
                    return resp.json();
                })
                .then((respJson)=> {
                    AppLog.i("Api.getNormalStoryList respJson = " + respJson);
                    resove(respJson);
                })
                .catch((error)=> {
                    AppLog.e("Api.getNormalStoryList error = " + error);
                    reject(error);
                })
                .done();
        });
    }

    getHomeStoryList() {
        var requestUrl = API_HOME_STORY_LIST_URL;
        AppLog.i("Api.getHomeStoryList requestUrl = " + requestUrl);
        return new Promise((resove, reject)=> {
            fetch(requestUrl)
                .then((resp)=> {
                    AppLog.i("Api.getHomeStoryList resp = " + resp);
                    return resp.json();
                })
                .then((respJson)=> {
                    AppLog.i("Api.getHomeStoryList respJson = " + respJson);
                    resove(respJson);
                })
                .catch((error)=> {
                    AppLog.e("Api.getHomeStoryList error = " + error);
                    reject(error);
                })
                .done();
        });
    }

    getStoryDetail(id) {
        var requestUrl = API_STORY_DETAIL_URL + id;
        AppLog.i("Api.getStoryDetail requestUrl = " + requestUrl);

        return new Promise((resove, reject)=> {
            fetch(requestUrl)
                .then((resp)=> {
                    AppLog.i("Api.getStoryDetail resp = " + resp);
                    return resp.json();
                })
                .then((respJson)=> {
                    AppLog.i("Api.getStoryDetail respJson = " + respJson);
                    resove(respJson);
                })
                .catch((error)=> {
                    AppLog.e("Api.getStoryDetail error = " + error);
                    reject(error);
                })
                .done();
        });
    }

    getLongCommentList(id) {
        var requestUrl = API_LONG_COMMENT_URL.replace('{id}', id);
        AppLog.i("Api.getLongCommentList requestUrl = " + requestUrl);

        return new Promise((resove, reject)=> {
            fetch(requestUrl)
                .then((resp)=> {
                    AppLog.i("Api.getLongCommentList resp = " + resp);
                    return resp.json();
                })
                .then((respJson)=> {
                    AppLog.i("Api.getLongCommentList respJson = " + respJson);
                    resove(respJson);
                })
                .catch((error)=> {
                    AppLog.e("Api.getLongCommentList error = " + error);
                    reject(error);
                })
                .done();
        });
    }

    getShortCommentList(id) {
        var requestUrl = API_SHORT_COMMENT_URL.replace('{id}', id);
        AppLog.i("Api.getShortCommentList requestUrl = " + requestUrl);

        return new Promise((resove, reject)=> {
            fetch(requestUrl)
                .then((resp)=> {
                    AppLog.i("Api.getShortCommentList resp = " + resp);
                    return resp.json();
                })
                .then((respJson)=> {
                    AppLog.i("Api.getShortCommentList respJson = " + respJson);
                    resove(respJson);
                })
                .catch((error)=> {
                    AppLog.e("Api.getShortCommentList error = " + error);
                    reject(error);
                })
                .done();
        });
    }
}

export  default Api;