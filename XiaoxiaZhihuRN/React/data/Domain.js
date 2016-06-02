/**
 * Created by xiaqiulei on 16/4/29.
 */

'use strict';

import {AsyncStorage} from "react-native";
import Api from "./HttpApi";
import NativeLog from "../native/NativeLog";

const KEY_START_INFO = 'start_info';

class Domain {

    getStartInfoFromLocal():Promise {
        var key = KEY_START_INFO;
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(
                key,
                (error, result)=> {
                    NativeLog.i("Domain.getStartInfoFromLocal:key = " + key + ", result = " + result);
                    var resultJson = JSON.parse(result);
                    if (error) {
                        NativeLog.e("Domain.getStartInfoFromLocal:key = " + key + ", error = " + error);
                        reject(error);
                    } else {
                        NativeLog.i("Domain.getStartInfoFromLocal:key = " + key + ", resultJson = " + resultJson);
                        resolve(resultJson);
                    }
                }
            );
        });
    }

    fetchStartInfoFromRemote() {
        var key = KEY_START_INFO;
        new Api()
            .getStartInfo()
            .then((responseJson)=> {
                NativeLog.i("Domain.fetchStartInfoFromRemote: responseJson = " + responseJson);
                AsyncStorage.setItem(key, JSON.stringify(responseJson));
            })
            .catch((error)=> {
                NativeLog.e("Domain.fetchStartInfoFromRemote: error = " + error);
            });
    }
}

export default Domain;