import {Rest} from "./Rest";

async function init() {
  new Rest().init()
}

init().then(() => console.log('ThreadMaster server online.'))