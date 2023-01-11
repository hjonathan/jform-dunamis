//import fs from 'node:fs';
const folders = ["./dunamis-editor", "./vue2-vuetify", "./vue2"]


import { exec } from "child_process";


//folders.forEach((folder) => {

// grep -rnwil './' -Ee  'setup\('
//`grep -rnwil '${folder}' -eE 'setup\\([\\w:,]*\\)\\s*\{'`

exec("grep -rnwil './' -Ee  'data\\(\\)'", (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    //console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

  // fs.readdir(folder, (err, result) => {
  //   if (err) {
  //     console.error(err)
  //     throw Error(err)
  //   }
  //   files = result;
  //   console.log(files);
  // })
//});

