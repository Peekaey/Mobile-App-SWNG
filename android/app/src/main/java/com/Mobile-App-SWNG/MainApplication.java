package com.yourprojectname;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage; // Add this import

public class MainApplication extends Application implements ReactApplication {
  // ...

  // Add this method to include the ReactNativeFirebaseAppPackage
  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      // ...
      new ReactNativeFirebaseAppPackage(), // Add this line
      // ...
    );
  }

  // ...
}