const { exec } = require("child_process");

let command = "ffmpeg -i C:/s1.wav -i C:/s2.wav F:/output.wav";

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
