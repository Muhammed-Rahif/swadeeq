```bash
# build command for dubug
ionic capacitor copy android && cd android && gradlew assembleDebug && cd ..

# build command for release
ionic capacitor copy android && cd android && gradlew assembleRelease && cd ..

# install to external device directly dubug version
ionic capacitor copy android && cd android && gradlew assembleDebug && gradlew installDebug && cd ..

# android external device run
ionic capacitor run android -l --watch --external
```

- ui design: https://cdn.dribbble.com/users/1147769/screenshots/17114459/media/e6719b6d98776cc75adcfcfb6812277d.png
