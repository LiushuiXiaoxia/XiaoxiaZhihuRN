package cn.mycommons.xiaoxiazhihu.module.widget.refresh;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * SwipeRefreshEvent <br/>
 * Created by xiaqiulei on 2016-05-11.
 */
class SwipeRefreshEvent extends Event<SwipeRefreshEvent> {

    public static final String EVENT_NAME = "topSwipeRefresh";

    public SwipeRefreshEvent(int viewTag, long timestampMs) {
        super(viewTag, timestampMs);
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    public short getCoalescingKey() {
        return 0;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), Arguments.createMap());
    }
}