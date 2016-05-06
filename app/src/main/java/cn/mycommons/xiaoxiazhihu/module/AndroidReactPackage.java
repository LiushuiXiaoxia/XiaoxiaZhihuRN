package cn.mycommons.xiaoxiazhihu.module;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import cn.mycommons.xiaoxiazhihu.module.natives.NativeLogModule;
import cn.mycommons.xiaoxiazhihu.module.natives.NativeToastModule;
import cn.mycommons.xiaoxiazhihu.module.widget.refresh.ReactSwipeRefreshLayoutManager;

/**
 * AndroidReactPackage <br/>
 * Created by xiaqiulei on 2016-04-29.
 */
public class AndroidReactPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> list = new ArrayList<>();
        list.add(new NativeToastModule(reactContext));
        list.add(new NativeLogModule(reactContext));
        return list;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> list = new ArrayList<>();
        list.add(new ReactSwipeRefreshLayoutManager());
        return list;
    }
}