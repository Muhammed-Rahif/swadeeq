const { exec } = require("child_process");
const fs = require("fs");

const androidBuildGradlePath = "android/app/build.gradle";
const androidBuildGradle = fs.readFileSync(androidBuildGradlePath, "utf8");

exports.preCommit = (props) => {
  const androidBuildGradleUpdated = androidBuildGradle.replace(
    /versionName "v[\d\.]+"/g,
    `versionName "${props.tag}"`
  );

  fs.writeFileSync(androidBuildGradlePath, androidBuildGradleUpdated);
};
