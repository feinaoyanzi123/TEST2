package com.zqw;

import android.app.Application;

import com.facebook.react.ReactApplication;
import me.vanpan.rctqqsdk.QQSDKPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.rnfs.RNFSPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.theweflex.react.WeChatPackage;
import com.imagepicker.ImagePickerPackage;
import com.airship.customwebview.CustomWebViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new QQSDKPackage(),
            new RNDeviceInfo(),
            new RNViewShotPackage(),
            new RNFSPackage(),
            new SplashScreenReactPackage(),
            new WeChatPackage(),
            new ImagePickerPackage(),
            new CustomWebViewPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
