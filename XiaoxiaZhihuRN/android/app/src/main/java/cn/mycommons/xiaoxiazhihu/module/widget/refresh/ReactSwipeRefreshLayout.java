package cn.mycommons.xiaoxiazhihu.module.widget.refresh;

import android.content.res.Resources;
import android.support.v4.widget.SwipeRefreshLayout;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ScrollView;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.events.NativeGestureUtil;

import cn.mycommons.xiaoxiazhihu.R;

/**
 * ReactSwipeRefreshLayout <br/>
 * Created by xiaqiulei on 2016-05-11.
 */
public class ReactSwipeRefreshLayout extends SwipeRefreshLayout {


    private static final String TAG = "NativeView";
    private ScrollView mScrollChild = null;

    public ReactSwipeRefreshLayout(ReactContext context) {
        super(context);

        init();
    }

    private void init() {
        Resources resources = getResources();
        setColorSchemeColors(resources.getColor(R.color.colorAccent), resources.getColor(R.color.colorPrimary));
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        if (mScrollChild != null && mScrollChild.getScrollY() > 0) {
            return false;
        }

        if (super.onInterceptTouchEvent(ev)) {
            NativeGestureUtil.notifyNativeGestureStarted(this, ev);
            return true;
        }

        return false;
    }

    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        super.onLayout(changed, left, top, right, bottom);
        mScrollChild = findScrollChild(this);
    }

    private ScrollView findScrollChild(View root) {
        View child = root;
        while (child instanceof ViewGroup) {
            child = ((ViewGroup) child).getChildAt(0);
            if (child instanceof ScrollView) {
                return (ScrollView) child;
            }
        }
        return null;
    }
}