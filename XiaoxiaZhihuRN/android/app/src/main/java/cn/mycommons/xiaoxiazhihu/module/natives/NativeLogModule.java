package cn.mycommons.xiaoxiazhihu.module.natives;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * NativeLogModule <br/>
 * Created by xiaqiulei on 2016-04-29.
 */
public class NativeLogModule extends ReactContextBaseJavaModule {

    static final String TAG = "XiaoXiaZhihuRN";

    public NativeLogModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NativeLog";
    }

    @ReactMethod
    public void e(String message) {
        Log.e(TAG, message);
    }

    @ReactMethod
    public void i(String message) {
        Log.i(TAG, message);
    }
}