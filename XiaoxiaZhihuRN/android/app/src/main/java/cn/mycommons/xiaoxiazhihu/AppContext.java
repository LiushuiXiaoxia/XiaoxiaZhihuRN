package cn.mycommons.xiaoxiazhihu;

import android.app.Application;

/**
 * AppContext <br/>
 * Created by xiaqiulei on 2016-06-03.
 */
public class AppContext extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        // LeakCanary.install(this);
    }
}