import {Rest} from "./src/Rest";

async function init() {
  await new Rest().init()
}

init().then(() => console.log('ThreadMaster server online.'))