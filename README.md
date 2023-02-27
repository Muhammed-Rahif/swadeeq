```bash
# build command
ionic capacitor copy android && cd android && gradlew assembleDebug && cd ..
ionic capacitor copy android && cd android && gradlew assembleDebug && gradlew installDebug && cd ..
# android external device run
ionic capacitor run android -l --watch --external
```
