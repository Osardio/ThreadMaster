import {Rest} from "./Rest";
import {Repository} from "./Repository"

async function init() {
  new Rest().init()
  await new Repository().init()
}

init().then(() => console.log('ThreadMaster server online.'))