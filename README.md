```bash
# build command
ionic capacitor copy android && cd android && gradlew assembleDebug && cd ..
ionic capacitor copy android && cd android && gradlew assembleDebug && gradlew installDebug && cd ..
# android external device run
ionic capacitor run android -l --watch --external
```

- ui design: https://cdn.dribbble.com/users/1147769/screenshots/17114459/media/e6719b6d98776cc75adcfcfb6812277d.png
