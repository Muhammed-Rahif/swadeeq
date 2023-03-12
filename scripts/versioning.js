const { exec } = require("child_process");
const fs = require("fs");

const androidBuildGradlePath = "android/app/build.gradle";
const androidBuildGradle = fs.readFileSync(androidBuildGradlePath, "utf8");

exports.preCommit = (props) => {
  if (props.tag) {
    const androidBuildGradleUpdated = androidBuildGradle.replace(
      /versionName "v[\d\.]+"/g,
      `versionName "${props.tag}"`
    );

    fs.writeFileSync(androidBuildGradlePath, androidBuildGradleUpdated);
  } else {
    exec("git describe --tags", (error, stdout, stderr) => {
      if (RegExp(/v[\d\.]+/g).test(stdout)) {
        const androidBuildGradleUpdated = androidBuildGradle.replace(
          /versionName "v[\d\.]+"/g,
          `versionName "${stdout.replace("\n", "")}"`
        );

        fs.writeFileSync(androidBuildGradlePath, androidBuildGradleUpdated);
      }
    });
  }
};
