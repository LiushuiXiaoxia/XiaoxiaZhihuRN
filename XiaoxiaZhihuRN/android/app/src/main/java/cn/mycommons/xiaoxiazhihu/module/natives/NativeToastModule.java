package cn.mycommons.xiaoxiazhihu.module.natives;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * NativeToastModule <br/>
 * Created by xiaqiulei on 2016-04-29.
 */
public class NativeToastModule extends ReactContextBaseJavaModule {

    public static final String DURATION_SHORT_KEY = "SHORT";
    public static final String DURATION_LONG_KEY = "LONG";

    public NativeToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NativeToast";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> map = new HashMap<>();
        map.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        map.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        return map;
    }

    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), "[" + message + "]", duration).show();
    }
}