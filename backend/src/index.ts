import {Rest} from "./Rest";

async function init() {
  await new Rest().init()
}

init().then(() => console.log('ThreadMaster server online.'))