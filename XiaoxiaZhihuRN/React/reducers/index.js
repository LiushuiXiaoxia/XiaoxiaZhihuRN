/**
 * Created by xiaqiulei on 16/6/8.
 */

'use strict';
import {combineReducers} from "redux";
import splash from "./splash";
import themelist from "./themelist";
import storylist from "./storylist";
import storydetail from "./storydetail";
import storycomment from "./storycomment";

const rootReduce = combineReducers({
    splash,
    themelist,
    storylist,
    storydetail,
    storycomment,
});

export default rootReduce;