package cn.mycommons.xiaoxiazhihu.module.widget.refresh;

import android.os.SystemClock;
import android.support.annotation.Nullable;
import android.support.v4.widget.SwipeRefreshLayout;
import android.util.Log;
import android.view.View;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.events.EventDispatcher;

import java.util.Map;

/**
 * ReactSwipeRefreshLayoutManager <br/>
 * Created by xiaqiulei on 2016-05-11.
 */
public class ReactSwipeRefreshLayoutManager extends ViewGroupManager<ReactSwipeRefreshLayout> {

    private static final String REACT_CLASS = "AndroidSwipeRefreshLayout";

    public static final int START_REFRESH = 1;
    public static final int FINISH_REFRESH = 2;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected void addEventEmitters(ThemedReactContext reactContext, ReactSwipeRefreshLayout view) {
        UIManagerModule nativeModule = reactContext.getNativeModule(UIManagerModule.class);
        view.setOnRefreshListener(new SwipeRefreshEventEmitter(view, nativeModule.getEventDispatcher()));
    }

    @Override
    protected ReactSwipeRefreshLayout createViewInstance(ThemedReactContext reactContext) {
        return new ReactSwipeRefreshLayout(reactContext);
    }

    @Override
    public boolean needsCustomLayoutForChildren() {
        return true;
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("startRefresh", START_REFRESH, "finishRefresh", FINISH_REFRESH);
    }

    @Override
    public void receiveCommand(ReactSwipeRefreshLayout root, int commandId, @Nullable ReadableArray args) {
        switch (commandId) {
            case START_REFRESH:
                root.setRefreshing(true);
                return;
            case FINISH_REFRESH:
                root.setRefreshing(false);
        }
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>of(
                SwipeRefreshEvent.EVENT_NAME,
                MapBuilder.of("registrationName", "onSwipeRefresh")
        );
    }

    @Override
    public void addView(ReactSwipeRefreshLayout parent, View child, int index) {
        if (getChildCount(parent) >= 2) {
            throw new JSApplicationIllegalArgumentException("The SwipeRefreshLayout cannot have more than one children");
        }

        parent.addView(child, index);
    }

    public static class SwipeRefreshEventEmitter implements SwipeRefreshLayout.OnRefreshListener {

        private final SwipeRefreshLayout mSwipeRefreshLayout;
        private final EventDispatcher mEventDispatcher;

        public SwipeRefreshEventEmitter(SwipeRefreshLayout layout, EventDispatcher dispatcher) {
            mSwipeRefreshLayout = layout;
            mEventDispatcher = dispatcher;
        }

        @Override
        public void onRefresh() {
            Log.e("xiaqiulei", "onRefresh");
            mEventDispatcher.dispatchEvent(new SwipeRefreshEvent(mSwipeRefreshLayout.getId(), SystemClock.uptimeMillis()));
        }
    }
}